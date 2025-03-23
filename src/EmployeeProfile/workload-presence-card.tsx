"use client"

import { useState } from "react"
import { Clock, Calendar, AlertCircle, Briefcase, FolderOpen, TrafficCone } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Bar from "@/components/ui/bar"
import { Button } from "@/components/ui/button"
import { ProjectsDialog } from "./projects-dialog"

type Project = {
  id: string
  nom: string
  dateDébut: string
  dateFin: string
  créePar: string
  créeLe: string
  posteOccupé: string
}

type WorkloadPresenceCardProps = {
  workloadPresence: {
    heuresTravaillees: number
    heuresPrevues: number
    absences: number
    retards: number
    posteActuel: string
    dateDebutPoste: string
    projetActuel: string
  }
  projects: Project[]
}

// Utility function to determine progress bar color
const getProgressColor = (percentage: number) => {
  if (percentage >= 90) return "bg-green-500" // Green for excellent presence
  if (percentage >= 70) return "bg-blue-500" // Blue for good presence
  if (percentage >= 50) return "bg-yellow-500" // Yellow for average presence
  return "bg-red-500" // Red for poor presence
}

export function WorkloadPresenceCard({ workloadPresence, projects }: WorkloadPresenceCardProps) {
  const [isProjectsDialogOpen, setIsProjectsDialogOpen] = useState(false)
  const tauxPresence = ((workloadPresence.heuresTravaillees / workloadPresence.heuresPrevues) * 100).toFixed(1)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Charge de Travail et Présence
          </CardTitle>
          <CardDescription>Suivi de l&apos;activité et de la présence de l&apos;employé</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Taux de Présence</p>
              <p className="text-sm font-medium">{tauxPresence}%</p>
            </div>
            <Bar
              displayPercentage={false}
              percentage={Number.parseFloat(tauxPresence)}
              color={getProgressColor(Number.parseFloat(tauxPresence))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Heures Travaillées</p>
              <p className="text-xl font-semibold">{workloadPresence.heuresTravaillees}h</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Heures Prévues</p>
              <p className="text-xl font-semibold">{workloadPresence.heuresPrevues}h</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Absences</p>
                <p className="text-xl font-semibold">{workloadPresence.absences} jour(s)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Retards</p>
                <p className="text-xl font-semibold">{workloadPresence.retards}</p>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Briefcase className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Poste Actuel</p>
            </div>
            <p className="text-base">{workloadPresence.posteActuel}</p>
            <p className="text-sm text-muted-foreground">Depuis le {workloadPresence.dateDebutPoste}</p>
          </div>
          <Separator />

          <div>
            <div className="flex items-center gap-2 mb-[12px]">
              <TrafficCone className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Projet en Cours</p>
            </div>
            <p className="text-base">{workloadPresence.projetActuel}</p>
            <p className="text-sm text-muted-foreground">Depuis le {workloadPresence.dateDebutPoste}</p>
          </div>

          <Button onClick={() => setIsProjectsDialogOpen(true)} className="w-full mt-4">
            <FolderOpen className="mr-2 h-4 w-4" /> Voir tous les projets
          </Button>
        </CardContent>
      </Card>

      <ProjectsDialog open={isProjectsDialogOpen} onOpenChange={setIsProjectsDialogOpen} projects={projects} />
    </>
  )
}

