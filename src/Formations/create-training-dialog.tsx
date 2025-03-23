"\"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
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

interface CreateTrainingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onTrainingCreated: (training: any) => void
}

export function CreateTrainingDialog({ open, onOpenChange, onTrainingCreated }: CreateTrainingDialogProps) {
  const [title, setTitle] = useState("")
  const [type, setType] = useState("Obligatoire")
  const [instructor, setInstructor] = useState("")
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [endDate, setEndDate] = useState<Date | null>(null)
  const [maxCapacity, setMaxCapacity] = useState("")
  const [description, setDescription] = useState("")
  const [status, setStatus] = useState("Planifié")

  const handleSubmit = () => {
    const newTraining = {
      title,
      type,
      instructor,
      startDate: startDate ? startDate.toISOString().split("T")[0] : "",
      endDate: endDate ? endDate.toISOString().split("T")[0] : "",
      maxCapacity: Number(maxCapacity),
      description,
      status,
    }

    onTrainingCreated(newTraining)
    onOpenChange(false)
    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setType("Obligatoire")
    setInstructor("")
    setStartDate(null)
    setEndDate(null)
    setMaxCapacity("")
    setDescription("")
    setStatus("Planifié")
  }

  const setDateRange = (update: [Date | null, Date | null]) => {
    const [start, end] = update
    setStartDate(start)
    setEndDate(end)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Créer une Nouvelle Formation</DialogTitle>
          <DialogDescription>Remplissez le formulaire ci-dessous pour créer une nouvelle formation.</DialogDescription>
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
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructeur</Label>
              <Input
                id="instructor"
                placeholder="Entrez le nom de l'instructeur"
                value={instructor}
                onChange={(e) => setInstructor(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Sélectionnez un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Planifié">Planifié</SelectItem>
                  <SelectItem value="En Cours">En Cours</SelectItem>
                  <SelectItem value="Terminé">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  wrapperClassName="w-full"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacité Maximale</Label>
              <Input
                id="capacity"
                type="number"
                placeholder="Entrez la capacité maximale"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
              />
            </div>
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button className="bg-blue-500 hover:bg-blue-600 text-white" onClick={handleSubmit}>
            Créer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

