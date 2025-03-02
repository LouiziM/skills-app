import { useState } from "react"
import { Book, Calendar, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

type Formation = {
  id: string
  titre: string
  type: "Obligatoire" | "Optionnel"
  dateDébut: string
  dateFin: string
  statut: "À venir" | "En cours" | "Réussi"
  satisfaction?: number
}

type TrainingCardProps = {
  formations: Formation[]
}

export function TrainingCard({ formations }: TrainingCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const upcomingTrainings = formations.filter((f) => f.statut === "À venir")
  const completedTrainings = formations.filter((f) => f.statut === "Réussi")

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Book className="h-5 w-5 text-primary" />
            Formations
          </CardTitle>
          <CardDescription>Suivi des formations de l'employé</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            <div>
              <h3 className="text-muted-foreground font-medium mb-2">Formations en cours</h3>
              {upcomingTrainings.length > 0 ? (
                <ul className="space-y-2">
                  {upcomingTrainings.slice(0, 2).map((formation) => (
                    <li key={formation.id} className="flex justify-between items-center">
                      <span className="text-sm">{formation.titre}</span>
                      <Badge variant={formation.type === "Obligatoire" ? "destructive" : "secondary"}>
                        {formation.type}
                      </Badge>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Aucune formation en cours</p>
              )}
            </div>

            {/* Separator */}
            <Separator />

            <div>
              <h3 className="text-muted-foreground font-medium mb-2">Formations terminées</h3>
              {completedTrainings.length > 0 ? (
                <ul className="space-y-2">
                  {completedTrainings.slice(0, 2).map((formation) => (
                    <li key={formation.id} className="flex justify-between items-center">
                      <span className="text-sm">{formation.titre}</span>
                      <div className="flex items-center">
                        <span className="text-sm">{formation.satisfaction}/5</span>
                        <Star className="h-4 w-4 text-yellow-400 ml-1" />
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">Aucune formation terminée</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsDialogOpen(true)} className="w-full">
            <Calendar className="mr-2 h-4 w-4" /> Voir toutes les formations
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Historique des Formations</DialogTitle>
            <DialogDescription>Liste complète des formations suivies et à venir</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {formations.map((formation) => (
              <div key={formation.id} className="flex justify-between items-center p-2 bg-muted rounded-md">
                <div>
                  <h4 className="font-medium">{formation.titre}</h4>
                  <p className="text-sm text-muted-foreground">
                    {formation.dateDébut} - {formation.dateFin}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={formation.type === "Obligatoire" ? "destructive" : "secondary"}>
                    {formation.type}
                  </Badge>
                  <Badge
                    variant={
                      formation.statut === "À venir"
                        ? "outline"
                        : formation.statut === "En cours"
                          ? "default"
                          : "success"
                    }
                  >
                    {formation.statut}
                  </Badge>
                  {formation.satisfaction && (
                    <div className="flex items-center">
                      <span>{formation.satisfaction}/5</span>
                      <Star className="h-4 w-4 text-yellow-400 ml-1" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}