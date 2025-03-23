"use client"

import { useState } from "react"
import { Phone, History, Frown, Meh, Smile, Laugh, Star } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { KPIHistoryDialog } from "./kpi-history-dialog"

type PerformanceCardProps = {
  performance: {
    appelsResolus: number
    appelsEscalades: number
    appelsAbandonnes: number
    dureeMoyenne: string
    tempsAttenteMoyen: string
    tauxPresence: string
    productiviteHoraire: number
    tauxResolution: string
    satisfactionClient: number
  }
}

const getSatisfactionIcon = (score: number) => {
  if (score >= 4.5) return <Laugh className="h-20 w-20 text-green-500" />
  if (score >= 3.5) return <Smile className="h-20 w-20 text-blue-500" />
  if (score >= 2.5) return <Meh className="h-20 w-20 text-yellow-500" />
  if (score >= 1.5) return <Frown className="h-20 w-20 text-orange-500" />
  return <Frown className="h-20 w-20 text-red-500" />
}

export function PerformanceCard({ performance }: PerformanceCardProps) {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Indicateurs de Performance
          </CardTitle>
          <CardDescription>Call center campaign performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Appels Résolus</p>
              <p className="text-xl font-semibold">{performance.appelsResolus}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Taux de Résolution</p>
              <p className="text-xl font-semibold">{performance.tauxResolution}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Durée Moyenne</p>
              <p className="text-xl font-semibold">{performance.dureeMoyenne}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Temps d&apos;Attente Moyen</p>
              <p className="text-xl font-semibold">{performance.tempsAttenteMoyen}</p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Taux de Présence</p>
              <p className="text-xl font-semibold">{performance.tauxPresence}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Productivité Horaire</p>
              <p className="text-xl font-semibold">{performance.productiviteHoraire} appels/h</p>
            </div>
          </div>

          <Separator />

          <p className="text-sm text-muted-foreground">Satisfaction Client</p>

          <div className="flex flex-col items-center space-y-2">
            <div className="flex items-center gap-1">
              {getSatisfactionIcon(performance.satisfactionClient)}
              {performance.satisfactionClient === 5 && <Star className="h-20 w-20 text-yellow-400 ml-1" />}
            </div>
            <p className="text-2xl font-bold">{performance.satisfactionClient.toFixed(1)}/5</p>
          </div>

          <Button onClick={() => setIsHistoryOpen(true)} className="w-full mt-4">
            <History className="mr-2 h-4 w-4" /> Voir l&apos;historique des KPI
          </Button>
        </CardContent>
      </Card>

      <KPIHistoryDialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen} />
    </>
  )
}

