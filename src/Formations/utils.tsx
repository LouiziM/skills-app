import type { Training } from "./types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Eye, EyeOff, Trash2 } from "lucide-react"
import { TrainingCard } from "./training-card"
import { TrainingFeedbackCard } from "./training-feedback-card"

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

// Shared function to render training cards with action buttons
export const renderTrainingCardWithActions = (
  training: Training,
  onViewDetails: (training: Training) => void,
  onEditTraining?: (training: Training) => void,
  onDeleteTraining?: (training: Training) => void,
  onToggleVisibility?: (training: Training) => void,
  isManagerOrHR = true,
) => {
  if (training.status.toLowerCase() === "terminé" && training.feedback) {
    return (
      <div key={training.id} className="relative mt-5">
        <div className="absolute top-[-20px] right-0 flex gap-1 p-1 z-10 overflow-visible">
          {onEditTraining && (
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
          {onToggleVisibility && (
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
          {onDeleteTraining && (
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
        <TrainingFeedbackCard training={training} onViewDetails={onViewDetails} isManagerOrHR={isManagerOrHR} />
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
          {onEditTraining && (
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
          {onToggleVisibility && (
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
          {onDeleteTraining && (
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
        <TrainingCard training={training} onViewDetails={onViewDetails} isManagerOrHR={isManagerOrHR} />
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

