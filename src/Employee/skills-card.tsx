import { useState } from "react"
import { Briefcase, ChevronUp, ChevronDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type Skill = {
  id: string
  nom: string
  type: "Technique" | "Comportemental"
  niveau: "Débutant" | "Intermédiaire" | "Avancé" | "Expert"
  progression: number
}

type SkillsCardProps = {
  skills: Skill[]
}

export function SkillsCard({ skills }: SkillsCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null)

  const sortedSkills = [...skills].sort((a, b) => b.progression - a.progression)

  const getProgressColor = (niveau: Skill["niveau"]) => {
    switch (niveau) {
      case "Débutant":
        return "bg-blue-500"
      case "Intermédiaire":
        return "bg-green-500"
      case "Avancé":
        return "bg-yellow-500"
      case "Expert":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <>
      <Card className="flex flex-col h-full">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            Compétences
          </CardTitle>
          <CardDescription>Aperçu des compétences de l&apos;employé</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="space-y-4">
            {sortedSkills.slice(0, 5).map((skill) => (
              <div key={skill.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">{skill.nom}</span>
                  <span className="text-xs text-muted-foreground">{skill.niveau}</span>
                </div>
                <Progress value={skill.progression} className={`h-2 ${getProgressColor(skill.niveau)}`} />
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={() => setIsDialogOpen(true)} className="w-full">
            Voir toutes les compétences
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Toutes les Compétences</DialogTitle>
            <DialogDescription>Liste complète des compétences de l&apos;employé</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {sortedSkills.map((skill) => (
              <div key={skill.id} className="border rounded-md p-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => setExpandedSkill(expandedSkill === skill.id ? null : skill.id)}
                >
                  <h4 className="font-medium">{skill.nom}</h4>
                  {expandedSkill === skill.id ? <ChevronUp /> : <ChevronDown />}
                </div>
                {expandedSkill === skill.id && (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm">Type: {skill.type}</p>
                    <p className="text-sm">Niveau: {skill.niveau}</p>
                    <Progress value={skill.progression} className={`h-2 ${getProgressColor(skill.niveau)}`} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

  