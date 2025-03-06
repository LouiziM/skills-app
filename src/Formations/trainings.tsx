import { useState } from "react"
import { CalendarIcon, Filter, Plus, Search, Users, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

// Données d'exemple
const trainings = [
  {
    id: 1,
    title: "Service Client Avancé",
    type: "Obligatoire",
    startDate: "2023-07-10",
    endDate: "2023-07-15",
    status: "Planifié",
    description:
      "Apprenez des techniques avancées pour gérer les interactions difficiles avec les clients et améliorer les scores de satisfaction.",
    instructor: "Sarah Johnson",
    enrolledCount: 15,
    maxCapacity: 20,
  },
  {
    id: 2,
    title: "Fondamentaux du Support Technique",
    type: "Optionnel",
    startDate: "2023-07-05",
    endDate: "2023-07-08",
    status: "En Cours",
    description:
      "Maîtrisez les bases du support technique, le dépannage des problèmes courants et l'utilisation efficace des outils de support.",
    instructor: "David Chen",
    enrolledCount: 12,
    maxCapacity: 15,
  },
  {
    id: 3,
    title: "Techniques de Résolution de Problèmes",
    type: "Obligatoire",
    startDate: "2023-06-20",
    endDate: "2023-06-25",
    status: "Terminé",
    description: "Développez des compétences de pensée critique et de résolution de problèmes pour résoudre efficacement les problèmes complexes des clients.",
    instructor: "Michael Brown",
    enrolledCount: 18,
    maxCapacity: 18,
    feedback: {
      satisfaction: 4.5,
      comments: [
        "Très utile pour mon travail quotidien",
        "L'instructeur était compétent et engageant",
        "Je le recommanderais à mes collègues",
      ],
    },
  },
  {
    id: 4,
    title: "Atelier de Collaboration en Équipe",
    type: "Optionnel",
    startDate: "2023-07-15",
    endDate: "2023-07-16",
    status: "Planifié",
    description:
      "Améliorez la communication, la collaboration et l'efficacité de l'équipe grâce à des exercices interactifs et des discussions.",
    instructor: "Emily Wilson",
    enrolledCount: 8,
    maxCapacity: 12,
  },
  {
    id: 5,
    title: "Meilleures Pratiques pour les Centres d'Appel",
    type: "Obligatoire",
    startDate: "2023-06-15",
    endDate: "2023-06-18",
    status: "Terminé",
    description:
      "Découvrez les meilleures pratiques de l'industrie pour les opérations des centres d'appel, la gestion des clients et les indicateurs de performance.",
    instructor: "Robert Taylor",
    enrolledCount: 20,
    maxCapacity: 20,
    feedback: {
      satisfaction: 4.2,
      comments: [
        "Contenu et livraison excellents",
        "Les exemples pratiques étaient très utiles",
        "J'aimerais plus de temps pour la pratique",
      ],
    },
  },
]

export default function Trainings() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [date, setDate] = useState<Date>()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  // Filtrer les formations en fonction du terme de recherche et des filtres
  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || training.type.toLowerCase() === filterType.toLowerCase()
    const matchesStatus = filterStatus === "all" || training.status.toLowerCase() === filterStatus.toLowerCase()

    return matchesSearch && matchesType && matchesStatus
  })

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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Formations</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Nouvelle Formation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer une Nouvelle Formation</DialogTitle>
              <DialogDescription>Planifiez une nouvelle session de formation pour les employés</DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Titre de la Formation</Label>
                  <Input id="title" placeholder="Entrez le titre de la formation" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type de Formation</Label>
                  <Select>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="obligatoire">Obligatoire</SelectItem>
                      <SelectItem value="optionnel">Optionnel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="start-date">Date de Début</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="end-date">Date de Fin</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Choisir une date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="instructor">Instructeur</Label>
                <Input id="instructor" placeholder="Entrez le nom de l'instructeur" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacité Maximale</Label>
                <Input id="capacity" type="number" placeholder="Entrez la capacité maximale" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Entrez la description de la formation" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Annuler
              </Button>
              <Button>Créer la Formation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher par titre ou instructeur..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
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
          <SelectTrigger className="w-[180px]">
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

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Vue en Liste</TabsTrigger>
          <TabsTrigger value="calendar">Vue Calendrier</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTrainings.map((training) => (
              <Card key={training.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{training.title}</CardTitle>
                      <CardDescription>{training.instructor}</CardDescription>
                    </div>
                    <Badge variant="outline" className={getStatusColor(training.status)}>
                      {training.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {training.startDate} au {training.endDate}
                      </span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>
                        {training.enrolledCount}/{training.maxCapacity} Inscrits
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Badge variant="secondary" className="mr-2">
                        {training.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{training.description}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Voir les Détails
                  </Button>
                  {training.status === "Planifié" && <Button size="sm">S'inscrire</Button>}
                  {training.status === "Terminé" && (
                    <Button size="sm" variant="secondary">
                      Voir les Feedbacks
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des Formations</CardTitle>
              <CardDescription>Voir les sessions de formation à venir et passées</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Formations à la Date Sélectionnée</h3>
                {date ? (
                  <div className="space-y-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">Service Client Avancé</CardTitle>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            Planifié
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>9h00 - 17h00</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span>15/20 Inscrits</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button size="sm">S'inscrire</Button>
                      </CardFooter>
                    </Card>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Sélectionnez une date pour voir les formations</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogue de Feedback sur la Formation */}
      <Dialog>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Feedback sur la Formation</DialogTitle>
            <DialogDescription>Donnez votre avis sur la formation terminée</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Satisfaction Globale</Label>
              <RadioGroup defaultValue="4">
                <div className="flex justify-between">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="r1" />
                    <Label htmlFor="r1">1</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="r2" />
                    <Label htmlFor="r2">2</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="r3" />
                    <Label htmlFor="r3">3</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="4" id="r4" />
                    <Label htmlFor="r4">4</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="r5" />
                    <Label htmlFor="r5">5</Label>
                  </div>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground pt-1">
                  <span>Mauvais</span>
                  <span>Excellent</span>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="comments">Commentaires</Label>
              <Textarea id="comments" placeholder="Partagez vos impressions sur la formation" />
            </div>

            <div className="space-y-2">
              <Label>Recommanderiez-vous cette formation à d'autres ?</Label>
              <RadioGroup defaultValue="yes">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yes" id="yes" />
                  <Label htmlFor="yes">Oui</Label>
                </div>
               
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="no" id="no" />
                  <Label htmlFor="no">Non</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <DialogFooter>
            <Button>Soumettre un Feedback</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

