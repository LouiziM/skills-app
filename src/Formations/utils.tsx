"use client"

import type { Training } from "./types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, EyeOff, Trash2, Star, CalendarIcon, Users } from "lucide-react"
import { cn } from "@/lib/utils"

// Function to generate a unique color based on training ID
export const getUniqueColor = (id: number, type: string, hidden = false) => {
  // Generate a unique hue based on the training ID
  // Use a prime number multiplier to get better distribution
  const hue = (id * 137.508) % 360 // Golden ratio * 360

  // For hidden trainings, use a lighter, more transparent version
  if (hidden) {
    return `hsla(${hue}, 80%, 80%, 0.7)`
  }

  return `hsl(${hue}, 80%, 50%)`
}

// Function to determine if feedback can be viewed
export const canViewFeedback = (training: Training, isManagerOrHR: boolean) => {
  // Only managers/HR can see feedback, regardless of status
  return isManagerOrHR
}

// Function to render star ratings
export const renderStars = (rating: number) => {
  return Array(5)
    .fill(0)
    .map((_, i) => (
      <Star key={i} className={cn("w-4 h-4", i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
    ))
}

// Shared function to render training cards with action buttons
export const renderTrainingCardWithActions = (
  training: Training,
  onViewDetails: (training: Training) => void,
  onEditTraining?: (training: Training) => void,
  onDeleteTraining?: (training: Training) => void,
  onToggleVisibility?: (training: Training) => void,
  isManagerOrHR = false,
) => {
  const hasFeedback = !!training.feedback
  const isCompleted = training.status.toLowerCase() === "terminé"
  const canRegister =
    !isManagerOrHR &&
    (training.status.toLowerCase() === "planifié" || training.status.toLowerCase() === "en cours") &&
    training.enrolledCount < training.maxCapacity

  // Check if feedback can be viewed
  const showFeedback = hasFeedback && canViewFeedback(training, isManagerOrHR)

  // Only show action buttons if isManagerOrHR is true
  const showActionButtons = isManagerOrHR && (onEditTraining || onToggleVisibility || onDeleteTraining)

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

  if (isCompleted && hasFeedback && showFeedback) {
    return (
      <div key={training.id} className="relative mt-5">
        <div className="absolute top-[-20px] right-0 flex gap-1 p-1 z-10 overflow-visible">
          {showActionButtons && onEditTraining && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-white border border-gray-200"
              onClick={(e) => {
                e.stopPropagation()
                onEditTraining(training)
              }}
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </Button>
          )}
          {showActionButtons && onToggleVisibility && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-white border border-gray-200"
              onClick={(e) => {
                e.stopPropagation()
                onToggleVisibility(training)
              }}
            >
              {training.hidden ? (
                <Eye className="h-4 w-4 text-gray-600" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-600" />
              )}
            </Button>
          )}
          {showActionButtons && onDeleteTraining && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-red-100 border border-gray-200"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteTraining(training)
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
        <div className="flex flex-col hover:shadow-lg transition-shadow duration-300 w-full h-full mb-4 border rounded-lg overflow-hidden bg-white">
          <div className="p-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium">{training.title}</h3>
                <p className="text-sm text-muted-foreground">{training.instructor}</p>
              </div>
              <Badge variant="outline" className={getStatusColor(training.status)}>
                {training.status}
              </Badge>
            </div>
            <div className="mt-2 space-y-2">
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
          </div>
          <div className="p-4 flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(training)}>
              Voir les Détails
            </Button>
            {showFeedback && (
              <Button variant="secondary" size="sm" onClick={() => onViewDetails(training)}>
                Feedbacks
              </Button>
            )}
          </div>
        </div>
        {training.hidden && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg border border-gray-300">
            <Badge variant="outline" className="bg-white text-gray-800 border border-gray-300">
              Formation masquée
            </Badge>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div key={training.id} className="relative mt-5">
        <div className="absolute top-[-20px] right-0 flex gap-1 p-1 z-10 overflow-visible">
          {showActionButtons && onEditTraining && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-white border border-gray-200"
              onClick={(e) => {
                e.stopPropagation()
                onEditTraining(training)
              }}
            >
              <Edit className="h-4 w-4 text-gray-600" />
            </Button>
          )}
          {showActionButtons && onToggleVisibility && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-white border border-gray-200"
              onClick={(e) => {
                e.stopPropagation()
                onToggleVisibility(training)
              }}
            >
              {training.hidden ? (
                <Eye className="h-4 w-4 text-gray-600" />
              ) : (
                <EyeOff className="h-4 w-4 text-gray-600" />
              )}
            </Button>
          )}
          {showActionButtons && onDeleteTraining && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full bg-white shadow-sm hover:bg-red-100 border border-gray-200"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteTraining(training)
              }}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          )}
        </div>
        <div className="flex flex-col hover:shadow-lg transition-shadow duration-300 w-full h-full mb-4 border rounded-lg overflow-hidden bg-white">
          <div className="p-4 border-b">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-base font-medium">{training.title}</h3>
                <p className="text-sm text-muted-foreground">{training.instructor}</p>
              </div>
              <Badge variant="outline" className={getStatusColor(training.status)}>
                {training.status}
              </Badge>
            </div>
            <div className="mt-2 space-y-2">
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
          </div>
          <div className="p-4 flex justify-between items-center">
            <Button variant="outline" size="sm" onClick={() => onViewDetails(training)}>
              Voir les Détails
            </Button>
            {canRegister && (
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
          </div>
        </div>
        {training.hidden && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg border border-gray-300">
            <Badge variant="outline" className="bg-white text-gray-800 border border-gray-300">
              Formation masquée
            </Badge>
          </div>
        )}
      </div>
    )
  }
}

