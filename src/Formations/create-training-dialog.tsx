"use client"

import { useState } from "react"
import { Plus, Search, X, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Types
interface Skill {
  id: string
  name: string
  type: string
  level: string
  description: string
  createdAt: string
}

interface Evaluation {
  id: string
  title: string
  type: string
  questions: number
}

// Sample data for skills
const skillsData: Skill[] = [
  {
    id: "1",
    name: "Communication Client",
    type: "Comportemental",
    level: "Intermédiaire",
    description: "Capacité à communiquer efficacement avec les clients",
    createdAt: "2023-01-15",
  },
  {
    id: "2",
    name: "Résolution de Problèmes",
    type: "Technique",
    level: "Avancé",
    description: "Capacité à résoudre des problèmes complexes",
    createdAt: "2023-02-10",
  },
  {
    id: "3",
    name: "Support Technique",
    type: "Technique",
    level: "Débutant",
    description: "Connaissances de base en support technique",
    createdAt: "2023-03-05",
  },
  {
    id: "4",
    name: "Gestion du Temps",
    type: "Comportemental",
    level: "Intermédiaire",
    description: "Capacité à gérer efficacement son temps et ses priorités",
    createdAt: "2023-04-20",
  },
  {
    id: "5",
    name: "Travail d'Équipe",
    type: "Comportemental",
    level: "Avancé",
    description: "Capacité à travailler efficacement en équipe",
    createdAt: "2023-05-15",
  },
]

// Sample data for evaluations
const evaluationsData: Evaluation[] = [
  {
    id: "1",
    title: "QCM Communication Client",
    type: "QCM",
    questions: 15,
  },
  {
    id: "2",
    title: "Évaluation Technique Support",
    type: "QCM",
    questions: 20,
  },
  {
    id: "3",
    title: "Test de Résolution de Problèmes",
    type: "QCM",
    questions: 10,
  },
]

interface CreateTrainingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTrainingCreated: (training: any) => void
}

export function CreateTrainingDialog({ open, onOpenChange, onTrainingCreated }: CreateTrainingDialogProps) {
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [instructor, setInstructor] = useState("")
  const [capacity, setCapacity] = useState("")
  const [description, setDescription] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)

  const setDateRange = (update: [Date | null, Date | null]) => {
    const [start, end] = update
    setStartDate(start)
    setEndDate(end)
  }

  //  State for skills selection
  const [isSkillsDialogOpen, setIsSkillsDialogOpen] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([])
  const [skillSearchTerm, setSkillSearchTerm] = useState("")

  // State for evaluations selection
  const [isEvaluationsDialogOpen, setIsEvaluationsDialogOpen] = useState(false)
  const [selectedEvaluations, setSelectedEvaluations] = useState<Evaluation[]>([])
  const [evalSearchTerm, setEvalSearchTerm] = useState("")
  // Filter skills
  const filteredSkills = skillsData.filter((skill) => skill.name.toLowerCase().includes(skillSearchTerm.toLowerCase()))

  // Handle skill selection
  const toggleSkillSelection = (skill: Skill) => {
    if (selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills(selectedSkills.filter((s) => s.id !== skill.id))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  // Remove a selected skill
  const removeSelectedSkill = (skillId: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill.id !== skillId))
  }

  // Filter evaluations
  const filteredEvaluations = evaluationsData.filter((evaluation) =>
    evaluation.title.toLowerCase().includes(evalSearchTerm.toLowerCase()),
  )

  // Handle evaluation selection
  const toggleEvaluationSelection = (evaluation: Evaluation) => {
    if (selectedEvaluations.some((e) => e.id === evaluation.id)) {
      setSelectedEvaluations(selectedEvaluations.filter((e) => e.id !== evaluation.id))
    } else {
      setSelectedEvaluations([...selectedEvaluations, evaluation])
    }
  }

  // Remove a selected evaluation
  const removeSelectedEvaluation = (evalId: string) => {
    setSelectedEvaluations(selectedEvaluations.filter((evaluation) => evaluation.id !== evalId))
  }

  // Handle form submission
  const handleSubmit = () => {
    // Format dates to string format
    const formattedStartDate = startDate ? startDate.toISOString().split("T")[0] : ""
    const formattedEndDate = endDate ? endDate.toISOString().split("T")[0] : ""

    // Create new training object
    const newTraining = {
      title,
      type,
      instructor,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      maxCapacity: Number.parseInt(capacity) || 0,
      enrolledCount: 0,
      description,
      status: "Planifié",
      skills: selectedSkills,
      evaluations: selectedEvaluations,
      hidden: false,
    }

    // Call the callback function with the new training
    onTrainingCreated(newTraining)

    // Reset form
    setTitle("")
    setType("")
    setInstructor("")
    setCapacity("")
    setDescription("")
    setStartDate(null)
    setEndDate(null)
    setSelectedSkills([])
    setSelectedEvaluations([])

    // Close dialog
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Créer une Nouvelle Formation</DialogTitle>
            <DialogDescription>Planifiez une nouvelle session de formation pour les employés</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la Formation</Label>
                <Input
                  id="title"
                  placeholder="Entrez le titre de la formation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type de Formation</Label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Obligatoire">Obligatoire</SelectItem>
                    <SelectItem value="Optionnel">Optionnel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Formateur */}
              <div className="space-y-2">
                <Label htmlFor="instructor">Instructeur</Label>
                <Input
                  id="instructor"
                  placeholder="Entrez le nom de l'instructeur"
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                />
              </div>

              {/* Date Range Picker */}
              <div className="space-y-2">
                <Label htmlFor="dateRange">Durée de formation</Label>
                <div className="w-full relative">
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 z-10">
                    <CalendarIcon className="h-4 w-4" />
                  </div>
                  <DatePicker
                    id="dateRange"
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update: [Date | null, Date | null]) => setDateRange(update)}
                    dateFormat="dd/MM/yyyy"
                    className="w-full border border-gray-300 rounded-md p-[5px] pl-8"
                    placeholderText="Sélectionner un intervale"
                    wrapperClassName="w-full" // This is important
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité Maximale</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Entrez la capacité maximale"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Entrez la description de la formation"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Add the skills section below the evaluations section */}
            <div className="space-y-2 border rounded-md p-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Compétences associées</Label>
                <Button variant="outline" size="sm" onClick={() => setIsSkillsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Associer des compétences
                </Button>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Les compétences qui seront développées durant cette formation.
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedSkills.length > 0 ? (
                  selectedSkills.map((skill) => (
                    <Badge key={skill.id} variant="secondary" className="flex items-center gap-1">
                      {skill.name}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeSelectedSkill(skill.id)
                        }}
                        className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Aucune compétence associée
                  </Badge>
                )}
              </div>
            </div>
            {/* Attached evaluations section */}
            <div className="space-y-2 border rounded-md p-4">
              <div className="flex justify-between items-center">
                <Label className="text-base font-medium">Évaluations attachées</Label>
                <Button variant="outline" size="sm" onClick={() => setIsEvaluationsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Attacher des évaluations
                </Button>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Les évaluations attachées seront proposées aux participants après la formation.
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedEvaluations.length > 0 ? (
                  selectedEvaluations.map((evaluation) => (
                    <Badge key={evaluation.id} variant="secondary" className="flex items-center gap-1">
                      {evaluation.title}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeSelectedEvaluation(evaluation.id)
                        }}
                        className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))
                ) : (
                  <Badge variant="outline" className="flex items-center gap-1">
                    Aucune évaluation attachée
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Annuler
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white"
              onClick={handleSubmit}
              disabled={!title || !type || !instructor || !startDate || !endDate || !capacity}
            >
              Créer la Formation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Evaluations Selection Dialog */}
      <Dialog open={isEvaluationsDialogOpen} onOpenChange={setIsEvaluationsDialogOpen}>
        <DialogContent className="w-fit max-w-[90vw] md:max-w-4xl ">
          <DialogHeader>
            <DialogTitle>Sélectionner des évaluations</DialogTitle>
            <DialogDescription>Choisissez les évaluations qui seront attachées à cette formation</DialogDescription>
          </DialogHeader>

          <div className="p-4 border-b">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher des évaluations..."
                value={evalSearchTerm}
                onChange={(e) => setEvalSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Mobile view: Card-based layout */}
          <div className="md:hidden min-w-[80vw]">
            <Tabs defaultValue="all" className="w-full ">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">Toutes ({filteredEvaluations.length})</TabsTrigger>
                <TabsTrigger value="selected">Sélectionnées ({selectedEvaluations.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-2">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2 p-1">
                    {filteredEvaluations.length > 0 ? (
                      filteredEvaluations.map((evaluation) => (
                        <div
                          key={evaluation.id}
                          className={cn(
                            "p-3 border rounded-lg cursor-pointer",
                            selectedEvaluations.some((e) => e.id === evaluation.id)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300",
                          )}
                          onClick={() => toggleEvaluationSelection(evaluation)}
                        >
                          <div className="flex items-start gap-2">
                            <Checkbox
                              checked={selectedEvaluations.some((e) => e.id === evaluation.id)}
                              onCheckedChange={() => toggleEvaluationSelection(evaluation)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="font-medium">{evaluation.title}</div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                  {evaluation.type}
                                </Badge>
                                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                  {evaluation.questions} questions
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Aucune évaluation trouvée correspondant à vos critères
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="selected" className="mt-2">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2 p-1">
                    {selectedEvaluations.length > 0 ? (
                      selectedEvaluations.map((evaluation) => (
                        <div key={evaluation.id} className="p-3 border border-blue-500 bg-blue-50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium">{evaluation.title}</div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                  {evaluation.type}
                                </Badge>
                                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                  {evaluation.questions} questions
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => removeSelectedEvaluation(evaluation.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">Aucune évaluation sélectionnée</div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop view: Table layout */}
          <div className="hidden md:block">
            <ScrollArea className="h-[300px] mt-2">
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                        <span className="sr-only">Sélectionner</span>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Titre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Questions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredEvaluations.length > 0 ? (
                      filteredEvaluations.map((evaluation) => (
                        <tr
                          key={evaluation.id}
                          className={cn(
                            "cursor-pointer hover:bg-gray-50",
                            selectedEvaluations.some((e) => e.id === evaluation.id) && "bg-blue-50",
                          )}
                          onClick={() => toggleEvaluationSelection(evaluation)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Checkbox
                              checked={selectedEvaluations.some((e) => e.id === evaluation.id)}
                              onCheckedChange={() => toggleEvaluationSelection(evaluation)}
                              className="pointer-events-none"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{evaluation.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              {evaluation.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">{evaluation.questions} questions</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                          Aucune évaluation trouvée correspondant à vos critères
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsEvaluationsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setIsEvaluationsDialogOpen(false)}>
              Confirmer la sélection ({selectedEvaluations.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Skills Selection Dialog */}
      <Dialog open={isSkillsDialogOpen} onOpenChange={setIsSkillsDialogOpen}>
        <DialogContent className="w-fit max-w-[90vw] md:max-w-4xl">
          <DialogHeader>
            <DialogTitle>Sélectionner des compétences</DialogTitle>
            <DialogDescription>Choisissez les compétences qui seront associées à cette formation</DialogDescription>
          </DialogHeader>

          <div className="p-4 border-b">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher des compétences..."
                value={skillSearchTerm}
                onChange={(e) => setSkillSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Mobile view: Card-based layout */}
          <div className="md:hidden min-w-[80vw]">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">Toutes ({filteredSkills.length})</TabsTrigger>
                <TabsTrigger value="selected">Sélectionnées ({selectedSkills.length})</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-2">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2 p-1">
                    {filteredSkills.length > 0 ? (
                      filteredSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className={cn(
                            "p-3 border rounded-lg cursor-pointer",
                            selectedSkills.some((s) => s.id === skill.id)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300",
                          )}
                          onClick={() => toggleSkillSelection(skill)}
                        >
                          <div className="flex items-start gap-2">
                            <Checkbox
                              checked={selectedSkills.some((s) => s.id === skill.id)}
                              onCheckedChange={() => toggleSkillSelection(skill)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="font-medium">{skill.name}</div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                  {skill.type}
                                </Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {skill.level}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        Aucune compétence trouvée correspondant à vos critères
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
              <TabsContent value="selected" className="mt-2">
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2 p-1">
                    {selectedSkills.length > 0 ? (
                      selectedSkills.map((skill) => (
                        <div key={skill.id} className="p-3 border border-blue-500 bg-blue-50 rounded-lg">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="font-medium">{skill.name}</div>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                                  {skill.type}
                                </Badge>
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  {skill.level}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => removeSelectedSkill(skill.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-gray-500">Aucune compétence sélectionnée</div>
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>

          {/* Desktop view: Table layout */}
          <div className="hidden md:block">
            <ScrollArea className="h-[300px] mt-2">
              <div className="overflow-x-auto">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-10">
                        <span className="sr-only">Sélectionner</span>
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Niveau
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSkills.length > 0 ? (
                      filteredSkills.map((skill) => (
                        <tr
                          key={skill.id}
                          className={cn(
                            "cursor-pointer hover:bg-gray-50",
                            selectedSkills.some((s) => s.id === skill.id) && "bg-blue-50",
                          )}
                          onClick={() => toggleSkillSelection(skill)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Checkbox
                              checked={selectedSkills.some((s) => s.id === skill.id)}
                              onCheckedChange={() => toggleSkillSelection(skill)}
                              className="pointer-events-none"
                            />
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{skill.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">
                              {skill.type}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {skill.level}
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                          Aucune compétence trouvée correspondant à vos critères
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </ScrollArea>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsSkillsDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={() => setIsSkillsDialogOpen(false)}>
              Confirmer la sélection ({selectedSkills.length})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

