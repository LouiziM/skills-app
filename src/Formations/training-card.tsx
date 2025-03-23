"use client"

import { CalendarIcon, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import type { Training } from "./types"

interface TrainingCardProps {
  training: Training
  onViewDetails: (training: Training) => void
  isManagerOrHR?: boolean
}

export function TrainingCard({ training, onViewDetails, isManagerOrHR = false }: TrainingCardProps) {
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

  const getTypeStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case "obligatoire":
        return "bg-red-500 text-white hover:bg-red-600"
      case "optionnel":
        return "bg-green-500 text-white hover:bg-green-600"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const canRegister =
    (training.status.toLowerCase() === "planifié" || training.status.toLowerCase() === "en cours") &&
    training.enrolledCount < training.maxCapacity

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 mb-4 w-full h-full bg-white">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base">{training.title}</CardTitle>
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
            <Badge className={`mr-2 ${getTypeStyles(training.type)}`}>{training.type}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">{training.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between mt-auto">
        <Button variant="outline" size="sm" onClick={() => onViewDetails(training)}>
          Voir les Détails
        </Button>

        {/* Only show registration buttons for non-managers/HR */}
        {!isManagerOrHR && canRegister && (
          <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
            S'inscrire
          </Button>
        )}

        {!isManagerOrHR &&
          (training.status.toLowerCase() === "planifié" || training.status.toLowerCase() === "en cours") &&
          training.enrolledCount >= training.maxCapacity && (
            <Button size="sm" variant="outline" disabled>
              Complet
            </Button>
          )}
      </CardFooter>
    </Card>
  )
}

