"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"

type Project = {
  id: string
  nom: string
  dateDébut: string
  dateFin: string
  créePar: string
  créeLe: string
  posteOccupé: string
}

type ProjectsDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  projects: Project[]
}

type SortConfig = {
  key: keyof Project
  direction: "ascending" | "descending"
}

export function ProjectsDialog({ open, onOpenChange, projects }: ProjectsDialogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null)

  const sortedProjects = [...projects].sort((a, b) => {
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

  const filteredProjects = sortedProjects.filter(
    (project) =>
      project.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.créePar.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const requestSort = (key: keyof Project) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:min-w-[790px] max-w-5xl">
        <DialogHeader>
          <DialogTitle>Historique des Projets</DialogTitle>
          <DialogDescription>Liste des projets sur lesquels l&apos;employé a travaillé</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Rechercher par nom du projet ou créateur..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="overflow-auto max-h-[60vh]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky top-0 bg-background">Nom du Projet</TableHead>
                <TableHead className="sticky top-0 bg-background ">Créé Par</TableHead>
                <TableHead
                  className="sticky top-0 bg-background cursor-pointer"
                  onClick={() => requestSort("posteOccupé")}
                >
                  Poste Occupé{" "}
                  {sortConfig?.key === "posteOccupé" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead
                  className="sticky top-0 bg-background cursor-pointer"
                  onClick={() => requestSort("dateDébut")}
                >
                  Date de Début{" "}
                  {sortConfig?.key === "dateDébut" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
                <TableHead className="sticky top-0 bg-background cursor-pointer" onClick={() => requestSort("dateFin")}>
                  Date de Fin {sortConfig?.key === "dateFin" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>

                <TableHead className="sticky top-0 bg-background cursor-pointer" onClick={() => requestSort("créeLe")}>
                  Créé Le {sortConfig?.key === "créeLe" ? (sortConfig.direction === "ascending" ? "↑" : "↓") : ""}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.nom}</TableCell>
                  <TableCell>{project.créePar}</TableCell>
                  <TableCell>{project.posteOccupé}</TableCell>
                  <TableCell>{project.dateDébut}</TableCell>
                  <TableCell>{project.dateFin || "En cours"}</TableCell>
                  <TableCell>{project.créeLe}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  )
}

