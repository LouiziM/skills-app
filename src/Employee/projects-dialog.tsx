import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

export function ProjectsDialog({ open, onOpenChange, projects }: ProjectsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>Historique des Projets</DialogTitle>
          <DialogDescription>Liste des projets sur lesquels l&apos;employé a travaillé</DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du Projet</TableHead>
              <TableHead>Poste Occupé</TableHead>
              <TableHead>Date de Début</TableHead>
              <TableHead>Date de Fin</TableHead>
              <TableHead>Créé Par</TableHead>
              <TableHead>Créé Le</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.nom}</TableCell>
                <TableCell>{project.posteOccupé}</TableCell>
                <TableCell>{project.dateDébut}</TableCell>
                <TableCell>{project.dateFin || "En cours"}</TableCell>
                <TableCell>{project.créePar}</TableCell>
                <TableCell>{project.créeLe}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  )
}

