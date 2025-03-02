import { useState } from "react"
import { MessageSquare, Star, ThumbsUp, Award, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

type FeedbackItem = {
  id: string
  type: "Performance" | "Peer" | "Customer"
  rating: number
  comment: string
  date: string
  source?: string
}

type EmployeeFeedbackCardProps = {
  feedback: FeedbackItem[]
}

export function EmployeeFeedbackCard({ feedback }: EmployeeFeedbackCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentFeedbackIndex, setCurrentFeedbackIndex] = useState(0)

  const sortedFeedback = [...feedback].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const getFeedbackIcon = (type: FeedbackItem["type"]) => {
    switch (type) {
      case "Performance":
        return <Award className="h-5 w-5 text-blue-500" />
      case "Peer":
        return <ThumbsUp className="h-5 w-5 text-green-500" />
      case "Customer":
        return <Star className="h-5 w-5 text-yellow-500" />
    }
  }

  const getAverageRating = () => {
    const total = feedback.reduce((sum, item) => sum + item.rating, 0)
    return (total / feedback.length).toFixed(1)
  }

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-primary" />
            Feedback et Évaluations
          </CardTitle>
          <CardDescription>Aperçu des retours reçus par l'employé</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-2xl font-bold">{getAverageRating()}</p>
                <p className="text-sm text-muted-foreground">Note moyenne</p>
              </div>
              <div className="flex gap-2">
                {["Performance", "Peer", "Customer"].map((type) => (
                  <Badge key={type} variant="outline" className="flex items-center gap-1">
                    {getFeedbackIcon(type as FeedbackItem["type"])}
                    <span>{feedback.filter((f) => f.type === type).length}</span>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              {sortedFeedback.slice(0, 2).map((item) => (
                <div key={item.id} className="bg-muted p-2 rounded-md">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-1">
                      {getFeedbackIcon(item.type)}
                      <span className="text-sm font-medium">{item.type}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2">{item.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsDialogOpen(true)} className="w-full">
            Voir tous les feedbacks
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Tous les Feedbacks</DialogTitle>
            <DialogDescription>Historique complet des évaluations et retours</DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  {getFeedbackIcon(sortedFeedback[currentFeedbackIndex].type)}
                  <span className="font-medium">{sortedFeedback[currentFeedbackIndex].type}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="text-lg font-bold">{sortedFeedback[currentFeedbackIndex].rating}</span>
                </div>
              </div>
              <p className="text-sm mb-2">{sortedFeedback[currentFeedbackIndex].comment}</p>
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{sortedFeedback[currentFeedbackIndex].date}</span>
                {sortedFeedback[currentFeedbackIndex].source && (
                  <span>Source: {sortedFeedback[currentFeedbackIndex].source}</span>
                )}
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentFeedbackIndex((prev) => (prev > 0 ? prev - 1 : sortedFeedback.length - 1))}
              >
                <ChevronLeft className="h-4 w-4 mr-2" /> Précédent
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentFeedbackIndex((prev) => (prev < sortedFeedback.length - 1 ? prev + 1 : 0))}
              >
                Suivant <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

