"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Star, Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

import type { Training } from "./types"

interface TrainingFeedbackCardProps {
  training: Training
  onViewDetails: (training: Training) => void
  isManagerOrHR?: boolean
}

export function TrainingFeedbackCard({ training, onViewDetails, isManagerOrHR = false }: TrainingFeedbackCardProps) {
  const [expandedFeedback, setExpandedFeedback] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={cn("w-4 h-4", i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
      ))
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

  const isCompleted = training.status.toLowerCase() === "terminé"
  const hasFeedback = !!training.feedback

  // Function to determine if feedback can be viewed
  const canViewFeedback = (training: Training) => {
    // Only managers/HR can see feedback, regardless of status
    return isManagerOrHR
  }

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow duration-300 w-full h-full mb-4 bg-white">
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

        {isCompleted && hasFeedback && isManagerOrHR && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="secondary" size="sm" className="flex items-center gap-1">
                Feedbacks
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Feedbacks</DialogTitle>
              </DialogHeader>

              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <span className="text-4xl font-bold text-primary">{training.feedback.satisfaction}</span>
                  <div className="flex mt-1 space-x-1">{renderStars(Math.round(training.feedback.satisfaction))}</div>
                  <span className="mt-1 text-sm text-muted-foreground">sur 5</span>
                </div>

                <div className="flex-1 ml-6 space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="w-3 text-sm font-medium">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Progress
                        value={
                          training.feedback.ratingDistribution?.[
                            rating as keyof typeof training.feedback.ratingDistribution
                          ] || 0
                        }
                        className="h-2 flex-1"
                      />
                      <span className="w-8 text-xs text-right text-muted-foreground">
                        {training.feedback.ratingDistribution?.[
                          rating as keyof typeof training.feedback.ratingDistribution
                        ] || 0}
                        %
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-4">
                {training.feedback.comments.map((item, index) => (
                  <Card key={typeof item === "string" ? index : item.id} className="overflow-hidden border shadow-sm">
                    <CardHeader className="p-4 pb-2 space-y-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            {typeof item === "string" ? (
                              <AvatarFallback>U</AvatarFallback>
                            ) : (
                              <>
                                <AvatarImage src={item.author.avatar} alt={item.author.name} />
                                <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                              </>
                            )}
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {typeof item === "string" ? "Utilisateur" : item.author.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {typeof item === "string" ? "Date non spécifiée" : item.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          {renderStars(typeof item === "string" ? 5 : item.rating)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <div className="relative">
                        <p
                          className={cn(
                            "text-sm",
                            typeof item !== "string" && expandedFeedback !== item.id && item.comment.length > 100
                              ? "line-clamp-2"
                              : "",
                          )}
                        >
                          {typeof item === "string" ? item : item.comment}
                        </p>
                        {typeof item !== "string" && item.comment.length > 100 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="absolute bottom-0 right-0 p-0 h-6 text-xs text-primary"
                            onClick={() => setExpandedFeedback(expandedFeedback === item.id ? null : item.id)}
                          >
                            {expandedFeedback === item.id ? "Voir moins" : "Lire plus"}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter className="p-2 bg-muted/20"></CardFooter>
                  </Card>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        )}

        {!isManagerOrHR &&
          (training.status.toLowerCase() === "planifié" || training.status.toLowerCase() === "en cours") &&
          training.enrolledCount < training.maxCapacity && (
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

