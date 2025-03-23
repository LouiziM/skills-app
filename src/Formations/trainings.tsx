"use client"

import { useState } from "react"
import { Filter, Plus, Search, Trash2, Eye, EyeOff, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { TrainingCalendar } from "./training-calendar"
import { CreateTrainingDialog } from "./create-training-dialog"
import { EditTrainingDialog } from "./edit-training-dialog"

// Update imports to use the shared types and utils
import type { Training } from "./types"
import { renderTrainingCardWithActions } from "./utils"

// Types
interface FeedbackItem {
  id: string
  rating: number
  comment: string
  author: {
    name: string
    avatar: string
  }
  date: string
}

interface TrainingFeedback {
  satisfaction: number
  comments: FeedbackItem[] | string[]
  ratingDistribution: {
    5: number
    4: number
    3: number
    2: number
    1: number
  }
}

// Données d'exemple
const initialTrainings: Training[] = [
  {
    id: 1,
    title: "Service Client Avancé",
    type: "Obligatoire",
    startDate: "2025-03-10",
    endDate: "2025-03-15",
    status: "Planifié",
    description:
      "Apprenez des techniques avancées pour gérer les interactions difficiles avec les clients et améliorer les scores de satisfaction.",
    instructor: "Sarah Johnson",
    enrolledCount: 15,
    maxCapacity: 20,
    hidden: false,
  },
  {
    id: 2,
    title: "Fondamentaux du Support Technique",
    type: "Optionnel",
    startDate: "2025-03-05",
    endDate: "2025-03-08",
    status: "En Cours",
    description:
      "Maîtrisez les bases du support technique, le dépannage des problèmes courants et l'utilisation efficace des outils de support.",
    instructor: "David Chen",
    enrolledCount: 12,
    maxCapacity: 15,
    hidden: false,
  },
  {
    id: 3,
    title: "Techniques de Résolution de Problèmes",
    type: "Obligatoire",
    startDate: "2025-03-20",
    endDate: "2025-03-25",
    status: "Terminé",
    description:
      "Développez des compétences de pensée critique et de résolution de problèmes pour résoudre efficacement les problèmes complexes des clients.",
    instructor: "Michael Brown",
    enrolledCount: 18,
    maxCapacity: 18,
    hidden: false,
    feedback: {
      satisfaction: 4.5,
      comments: [
        "Très utile pour mon travail quotidien",
        "L'instructeur était compétent et engageant",
        "Je le recommanderais à mes collègues",
      ],
      ratingDistribution: {
        5: 60,
        4: 30,
        3: 10,
        2: 0,
        1: 0,
      },
    },
  },
  {
    id: 4,
    title: "Atelier de Collaboration en Équipe",
    type: "Optionnel",
    startDate: "2025-03-15",
    endDate: "2025-03-16",
    status: "Planifié",
    description:
      "Améliorez la communication, la collaboration et l'efficacité de l'équipe grâce à des exercices interactifs et des discussions.",
    instructor: "Emily Wilson",
    enrolledCount: 8,
    maxCapacity: 12,
    hidden: false,
  },
  {
    id: 5,
    title: "Meilleures Pratiques pour les Centres d'Appel",
    type: "Obligatoire",
    startDate: "2025-03-15",
    endDate: "2025-03-18",
    status: "Terminé",
    description:
      "Découvrez les meilleures pratiques de l'industrie pour les opérations des centres d'appel, la gestion des clients et les indicateurs de performance.",
    instructor: "Robert Taylor",
    enrolledCount: 20,
    maxCapacity: 20,
    hidden: false,
    feedback: {
      satisfaction: 4.2,
      comments: [
        "Contenu et livraison excellents",
        "Les exemples pratiques étaient très utiles",
        "J'aimerais plus de temps pour la pratique",
      ],
      ratingDistribution: {
        5: 40,
        4: 45,
        3: 10,
        2: 5,
        1: 0,
      },
    },
  },
]

// Extract the renderTrainingCard function to a separate utility function that can be shared
// Add this at the top of the file, after the imports

export default function Trainings() {
  const [trainings, setTrainings] = useState<Training[]>(initialTrainings)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showHidden, setShowHidden] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null)

  // Filtrer les formations en fonction du terme de recherche et des filtres
  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || training.type.toLowerCase() === filterType.toLowerCase()
    const matchesStatus = filterStatus === "all" || training.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesVisibility = showHidden || !training.hidden

    return matchesSearch && matchesType && matchesStatus && matchesVisibility
  })

  // Afficher les détails d'une formation
  const handleViewDetails = (training: Training) => {
    setSelectedTraining(training)
    setIsDetailDialogOpen(true)
  }

  // Ajouter une nouvelle formation
  const handleTrainingCreated = (newTraining: Training) => {
    const trainingWithId = {
      ...newTraining,
      id: Math.max(...trainings.map((t) => t.id), 0) + 1,
      hidden: false,
    }
    setTrainings([...trainings, trainingWithId])
  }

  // Supprimer une formation
  const handleDeleteTraining = () => {
    if (selectedTraining) {
      setTrainings(trainings.filter((training) => training.id !== selectedTraining.id))
      setIsDeleteDialogOpen(false)
      setSelectedTraining(null)
    }
  }

  // Ouvrir la boîte de dialogue de suppression
  const openDeleteDialog = (training: Training) => {
    setSelectedTraining(training)
    setIsDeleteDialogOpen(true)
  }

  // Basculer la visibilité d'une formation
  const toggleTrainingVisibility = (training: Training) => {
    setTrainings(trainings.map((t) => (t.id === training.id ? { ...t, hidden: !t.hidden } : t)))
  }

  // Ouvrir la boîte de dialogue d'édition
  const openEditDialog = (training: Training) => {
    setSelectedTraining(training)
    setIsEditDialogOpen(true)
  }

  // Mettre à jour une formation
  const handleTrainingUpdated = (updatedTraining: Training) => {
    setTrainings(trainings.map((t) => (t.id === updatedTraining.id ? updatedTraining : t)))
    setIsEditDialogOpen(false)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "planifié":
        return "bg-blue-100 text-blue-800"
      case "en cours":
        return "bg-yellow-100 text-yellow-800"
      case "terminé":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Update the renderTrainingCard method to use the shared function
  const renderTrainingCard = (training: Training) => {
    return renderTrainingCardWithActions(
      training,
      handleViewDetails,
      openEditDialog,
      openDeleteDialog,
      toggleTrainingVisibility,
      true, // isManagerOrHR
    )
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <h2 className="text-2xl font-bold">Formations</h2>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowHidden(!showHidden)}
            className={showHidden ? "bg-blue-50" : ""}
          >
            {showHidden ? <Eye className="mr-2 h-4 w-4" /> : <EyeOff className="mr-2 h-4 w-4" />}
            {showHidden ? "Afficher tout" : "Afficher masquées"}
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Nouvelle Formation
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher par titre ou instructeur..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrer par type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les Types</SelectItem>
              <SelectItem value="obligatoire">Obligatoire</SelectItem>
              <SelectItem value="optionnel">Optionnel</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les Statuts</SelectItem>
              <SelectItem value="planifié">Planifié</SelectItem>
              <SelectItem value="en cours">En Cours</SelectItem>
              <SelectItem value="terminé">Terminé</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="list" className="flex-1 sm:flex-none">
            Vue en Cartes
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex-1 sm:flex-none">
            Vue Calendrier
          </TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrainings.map((training) => renderTrainingCard(training))}
          </div>
          {filteredTrainings.length === 0 && (
            <div className="text-center py-10 text-muted-foreground">
              Aucune formation ne correspond à vos critères de recherche
            </div>
          )}
        </TabsContent>

        <TabsContent value="calendar">
          <TrainingCalendar
            trainings={trainings.filter((t) => !t.hidden || showHidden)}
            onViewDetails={handleViewDetails}
            onEditTraining={openEditDialog}
            onDeleteTraining={openDeleteDialog}
            onToggleVisibility={toggleTrainingVisibility}
          />
        </TabsContent>
      </Tabs>

      {/* Dialogue de détails de la formation */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="max-w-2xl">
          {selectedTraining && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedTraining.title}</DialogTitle>
                <DialogDescription>
                  <Badge variant="outline" className={getStatusColor(selectedTraining.status)}>
                    {selectedTraining.status}
                  </Badge>
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-1">Instructeur</h3>
                    <p>{selectedTraining.instructor}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Type</h3>
                    <p>
                      <Badge
                        className={
                          selectedTraining.type.toLowerCase() === "obligatoire"
                            ? "bg-red-500 text-white"
                            : "bg-green-500 text-white"
                        }
                      >
                        {selectedTraining.type}
                      </Badge>
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-1">Date de début</h3>
                    <p>{selectedTraining.startDate}</p>
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Date de fin</h3>
                    <p>{selectedTraining.endDate}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Participants</h3>
                  <p>
                    {selectedTraining.enrolledCount}/{selectedTraining.maxCapacity} inscrits
                  </p>
                </div>

                <div>
                  <h3 className="font-medium mb-1">Description</h3>
                  <p>{selectedTraining.description}</p>
                </div>

                {selectedTraining.skills && selectedTraining.skills.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-1">Compétences attribuées</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedTraining.skills.map((skill) => (
                        <Badge key={skill.id} variant="secondary">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedTraining.evaluations && selectedTraining.evaluations.length > 0 && (
                  <div>
                    <h3 className="font-medium mb-1">Évaluations attachées</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedTraining.evaluations.map((evaluation) => (
                        <Badge key={evaluation.id} variant="secondary">
                          {evaluation.title}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <DialogFooter className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsDetailDialogOpen(false)
                    openEditDialog(selectedTraining)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Modifier
                </Button>
                <Button variant="outline" onClick={() => toggleTrainingVisibility(selectedTraining)}>
                  {selectedTraining.hidden ? (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Afficher
                    </>
                  ) : (
                    <>
                      <EyeOff className="mr-2 h-4 w-4" />
                      Masquer
                    </>
                  )}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    setIsDetailDialogOpen(false)
                    openDeleteDialog(selectedTraining)
                  }}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Supprimer
                </Button>
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Fermer
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* CreateTrainingDialog */}
      <CreateTrainingDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onTrainingCreated={handleTrainingCreated}
      />

      {/* EditTrainingDialog */}
      {selectedTraining && (
        <EditTrainingDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          training={selectedTraining}
          onTrainingUpdated={handleTrainingUpdated}
        />
      )}

      {/* DeleteTrainingDialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Êtes-vous sûr de vouloir supprimer cette formation ?</AlertDialogTitle>
            <AlertDialogDescription>
              Cette action est irréversible. Toutes les données associées à cette formation seront définitivement
              supprimées.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTraining} className="bg-red-500 text-white hover:bg-red-600">
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

