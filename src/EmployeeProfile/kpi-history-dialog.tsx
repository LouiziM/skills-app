"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

type KPIHistoryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type SortConfig = {
  key: keyof (typeof historicalKPIs)[number]
  direction: "ascending" | "descending"
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
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  const sortedKPIs = [...historicalKPIs].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
    }
    return 0
  })

  const filteredKPIs = sortedKPIs.filter((kpi) => kpi.period.toLowerCase().includes(searchTerm.toLowerCase()))

  const requestSort = (key: keyof (typeof historicalKPIs)[number]) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-[680px]">
        <DialogHeader>
          <DialogTitle>Historique des KPI</DialogTitle>
          <DialogDescription>Suivi des performances sur les derniers mois</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Rechercher par période..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-auto max-h-[60vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky top-0 bg-background">Période</TableHead>
                <TableHead
                  className="sticky top-0 bg-background cursor-pointer"
                  onClick={() => requestSort("tauxPresence")}
                >
                  Taux de Présence{" "}
                  {sortConfig?.key === "tauxPresence" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead
                  className="sticky top-0 bg-background cursor-pointer"
                  onClick={() => requestSort("productiviteHoraire")}
                >
                  Productivité Horaire{" "}
                  {sortConfig?.key === "productiviteHoraire" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead
                  className="sticky top-0 bg-background cursor-pointer"
                  onClick={() => requestSort("tauxResolution")}
                >
                  Taux de Résolution{" "}
                  {sortConfig?.key === "tauxResolution" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead
                  className="sticky top-0 bg-background cursor-pointer"
                  onClick={() => requestSort("satisfactionClient")}
                >
                  Satisfaction Client{" "}
                  {sortConfig?.key === "satisfactionClient" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredKPIs.map((kpi) => (
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
        </div>
      </DialogContent>
    </Dialog>
  )
}

