import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type KPIHistoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const historicalKPIs = [
  {
    period: "Jan 2023",
    tauxPresence: "95%",
    productiviteHoraire: 12,
    tauxResolution: "87%",
    satisfactionClient: 4.2,
  },
  {
    period: "Feb 2023",
    tauxPresence: "93%",
    productiviteHoraire: 13,
    tauxResolution: "89%",
    satisfactionClient: 4.3,
  },
  {
    period: "Mar 2023",
    tauxPresence: "97%",
    productiviteHoraire: 14,
    tauxResolution: "91%",
    satisfactionClient: 4.5,
  },
]

export function KPIHistoryDialog({ open, onOpenChange }: KPIHistoryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Historique des KPI</DialogTitle>
          <DialogDescription>Suivi des performances sur les derniers mois</DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Période</TableHead>
              <TableHead>Taux de Présence</TableHead>
              <TableHead>Productivité Horaire</TableHead>
              <TableHead>Taux de Résolution</TableHead>
              <TableHead>Satisfaction Client</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historicalKPIs.map((kpi) => (
              <TableRow key={kpi.period}>
                <TableCell>{kpi.period}</TableCell>
                <TableCell>{kpi.tauxPresence}</TableCell>
                <TableCell>{kpi.productiviteHoraire} appels/h</TableCell>
                <TableCell>{kpi.tauxResolution}</TableCell>
                <TableCell>{kpi.satisfactionClient}/5</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

