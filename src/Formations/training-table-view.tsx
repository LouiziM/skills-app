"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Users, Star, ChevronDown, ChevronUp } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

import type { Training, FeedbackItem, TrainingFeedback } from "./types"

interface TrainingTableViewProps {
  trainings: Training[]
  isManagerOrHR: boolean
  onViewDetails: (training: Training) => void
  onEditTraining?: (training: Training) => void
  onDeleteTraining?: (training: Training) => void
  onToggleVisibility?: (training: Training) => void
}

export function TrainingTableView({
  trainings,
  isManagerOrHR,
  onViewDetails,
  onEditTraining,
  onDeleteTraining,
  onToggleVisibility,
}: TrainingTableViewProps) {
  const [expandedTraining, setExpandedTraining] = useState<number | null>(null)
  const [feedbackDialogOpen, setFeedbackDialogOpen] = useState(false)
  const [selectedFeedback, setSelectedFeedback] = useState<TrainingFeedback | null>(null)
  const [selectedTrainingTitle, setSelectedTrainingTitle] = useState<string>("")

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
        return "bg-red-500 text-white"
      case "optionnel":
        return "bg-green-500 text-white"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const toggleExpand = (id: number) => {
    setExpandedTraining(expandedTraining === id ? null : id)
  }

  const openFeedbackDialog = (training: Training) => {
    if (training.feedback) {
      setSelectedFeedback(training.feedback)
      setSelectedTrainingTitle(training.title)
      setFeedbackDialogOpen(true)
    }
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star key={i} className={cn("w-4 h-4", i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300")} />
      ))
  }

  // Function to determine if feedback can be viewed
  const canViewFeedback = (training: Training) => {
    // Only managers/HR can see feedback, regardless of status
    return isManagerOrHR
  }

  return (
    <>
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10"></TableHead>
              <TableHead>Titre</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Instructeur</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainings.map((training) => (
              <>
                <TableRow
                  key={training.id}
                  className={cn("cursor-pointer hover:bg-muted/50", training.hidden && "bg-gray-50 text-gray-500")}
                >
                  <TableCell>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => toggleExpand(training.id)}>
                      {expandedTraining === training.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium" onClick={() => toggleExpand(training.id)}>
                    {training.title}
                    {training.feedback && isManagerOrHR && (
                      <div className="flex items-center mt-1">
                        {renderStars(Math.round(training.feedback.satisfaction))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          {training.feedback.satisfaction.toFixed(1)}
                        </span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell onClick={() => toggleExpand(training.id)}>
                    <Badge className={getTypeStyles(training.type)}>{training.type}</Badge>
                  </TableCell>
                  <TableCell onClick={() => toggleExpand(training.id)}>{training.instructor}</TableCell>
                  <TableCell onClick={() => toggleExpand(training.id)}>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {training.startDate} au {training.endDate}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell onClick={() => toggleExpand(training.id)}>
                    <Badge variant="outline" className={getStatusColor(training.status)}>
                      {training.status}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={() => toggleExpand(training.id)}>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {training.enrolledCount}/{training.maxCapacity}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => onViewDetails(training)}>
                        Détails
                      </Button>
                      {training.status.toLowerCase() === "terminé" && training.feedback && isManagerOrHR && (
                        <Button variant="secondary" size="sm" onClick={() => openFeedbackDialog(training)}>
                          Feedbacks
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
                {expandedTraining === training.id && (
                  <TableRow>
                    <TableCell colSpan={8} className="p-4 bg-muted/20">
                      <div className="grid gap-4">
                        <div>
                          <h3 className="font-medium mb-1">Description</h3>
                          <p className="text-sm">{training.description}</p>
                        </div>

                        {training.skills && training.skills.length > 0 && (
                          <div>
                            <h3 className="font-medium mb-1">Compétences</h3>
                            <div className="flex flex-wrap gap-2">
                              {training.skills.map((skill) => (
                                <Badge key={skill.id} variant="secondary">
                                  {skill.name}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {training.evaluations && training.evaluations.length > 0 && (
                          <div>
                            <h3 className="font-medium mb-1">Évaluations</h3>
                            <div className="flex flex-wrap gap-2">
                              {training.evaluations.map((evaluation) => (
                                <Badge key={evaluation.id} variant="secondary">
                                  {evaluation.title}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Show feedback section if available and user can view it */}
                        {training.feedback && isManagerOrHR && (
                          <div>
                            <h3 className="font-medium mb-1">Feedback</h3>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {renderStars(Math.round(training.feedback.satisfaction))}
                              </div>
                              <span className="text-sm">{training.feedback.satisfaction.toFixed(1)} / 5</span>
                              <Button variant="outline" size="sm" onClick={() => openFeedbackDialog(training)}>
                                Voir tous les feedbacks
                              </Button>
                            </div>
                          </div>
                        )}

                        {isManagerOrHR && (
                          <div className="flex justify-end gap-2 mt-2">
                            {onEditTraining && (
                              <Button variant="outline" size="sm" onClick={() => onEditTraining(training)}>
                                Modifier
                              </Button>
                            )}
                            {onToggleVisibility && (
                              <Button variant="outline" size="sm" onClick={() => onToggleVisibility(training)}>
                                {training.hidden ? "Afficher" : "Masquer"}
                              </Button>
                            )}
                            {onDeleteTraining && (
                              <Button variant="destructive" size="sm" onClick={() => onDeleteTraining(training)}>
                                Supprimer
                              </Button>
                            )}
                          </div>
                        )}
                        {!isManagerOrHR &&
                          (training.status.toLowerCase() === "planifié" ||
                            training.status.toLowerCase() === "en cours") &&
                          training.enrolledCount < training.maxCapacity && (
                            <div className="flex justify-end mt-2">
                              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                                S'inscrire
                              </Button>
                            </div>
                          )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
            {trainings.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Aucune formation trouvée
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Feedback Dialog */}
      <Dialog open={feedbackDialogOpen} onOpenChange={setFeedbackDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Feedbacks - {selectedTrainingTitle}</DialogTitle>
          </DialogHeader>

          {selectedFeedback && (
            <>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                  <span className="text-4xl font-bold text-primary">{selectedFeedback.satisfaction}</span>
                  <div className="flex mt-1 space-x-1">{renderStars(Math.round(selectedFeedback.satisfaction))}</div>
                  <span className="mt-1 text-sm text-muted-foreground">sur 5</span>
                </div>

                <div className="flex-1 ml-6 space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center gap-2">
                      <span className="w-3 text-sm font-medium">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <Progress
                        value={
                          selectedFeedback.ratingDistribution?.[
                            rating as keyof typeof selectedFeedback.ratingDistribution
                          ] || 0
                        }
                        className="h-2 flex-1"
                      />
                      <span className="w-8 text-xs text-right text-muted-foreground">
                        {selectedFeedback.ratingDistribution?.[
                          rating as keyof typeof selectedFeedback.ratingDistribution
                        ] || 0}
                        %
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <ScrollArea className="mt-4 max-h-[400px]">
                <div className="space-y-4">
                  {selectedFeedback.comments.map((item, index) => (
                    <div
                      key={typeof item === "string" ? index : (item as FeedbackItem).id}
                      className="p-4 border rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="w-8 h-8">
                            {typeof item === "string" ? (
                              <AvatarFallback>U</AvatarFallback>
                            ) : (
                              <>
                                <AvatarImage
                                  src={(item as FeedbackItem).author.avatar}
                                  alt={(item as FeedbackItem).author.name}
                                />
                                <AvatarFallback>{(item as FeedbackItem).author.name.charAt(0)}</AvatarFallback>
                              </>
                            )}
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {typeof item === "string" ? "Utilisateur" : (item as FeedbackItem).author.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {typeof item === "string" ? "Date non spécifiée" : (item as FeedbackItem).date}
                            </p>
                          </div>
                        </div>
                        {typeof item !== "string" && (
                          <div className="flex items-center space-x-1">
                            {renderStars((item as FeedbackItem).rating)}
                          </div>
                        )}
                      </div>
                      <p className="text-sm">{typeof item === "string" ? item : (item as FeedbackItem).comment}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

