"use client"

import { X, Phone, Mail, Briefcase, Star, User, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Bar from "@/components/ui/bar"
import profileFemale from '../assets/profileFemale.png';
import profileMale from '../assets/profile.png';
type Employee = {
  id: string
  civilité: "M." | "Mme"
  nom: string
  prénom: string
  nationalité: string
  dateDeNaissance: string
  téléphonePrincipal: string
  téléphoneSecondaire: string
  email: string
  pays: string
  ville: string
  adresse: string
  dateEmbauche: string
  typeContrat: string
  position: string
  department: string
  avatar: string
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
  workloadPresence: {
    heuresTravaillees: number
    heuresPrevues: number
    absences: number
    retards: number
    posteActuel: string
    dateDebutPoste: string
    projetActuel: string
  }
}

type EmployeeSummaryCardProps = {
  employee: Employee
  onViewProfile: () => void
  onClose: () => void
  compact?: boolean
}

// Fonction pour calculer l'âge à partir de la date de naissance
const calculateAge = (dateDeNaissance: string) => {
  const birthDate = new Date(dateDeNaissance)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

// Fonction pour déterminer la couleur de la barre de progression
const getProgressColor = (percentage: number) => {
  if (percentage >= 90) return "bg-green-500" // Vert pour une excellente présence
  if (percentage >= 70) return "bg-blue-500" // Bleu pour une bonne présence
  if (percentage >= 50) return "bg-yellow-500" // Jaune pour une présence moyenne
  return "bg-red-500" // Rouge pour une présence faible
}

export function EmployeeSummaryCard({ employee, onViewProfile, onClose, compact = false }: EmployeeSummaryCardProps) {
  const age = calculateAge(employee.dateDeNaissance)
  const tauxPresence = Number.parseInt(employee.performance.tauxPresence.replace("%", ""))

  // Déterminer l'image de profil en fonction du genre
  const profileImage = () => {
    // if (employee.avatar) {
    //   return employee.avatar
    // }
    const image = employee?.civilité === "Mme" ? profileFemale : profileMale;
    return `${image}?height=200&width=200`;
  };
  return (
    <Card className="relative h-full flex flex-col">
      <Button variant="ghost" size="icon" className="absolute right-2 top-2 z-10" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>

      <CardContent className={`p-4 flex flex-col ${compact ? "space-y-2" : "space-y-4"} h-full`}>
        <div className="flex items-center gap-3">
          <div className={`${compact ? "w-12 h-12" : "w-16 h-16"} rounded-full overflow-hidden`}>
            <img
              src={profileImage()}
              alt={`${employee.prénom} ${employee.nom}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold">
              {employee.civilité} {employee.prénom} {employee.nom}
            </h3>
            <p className="text-sm text-muted-foreground">{employee.position}</p>
          </div>
        </div>

        <Separator />

        <div className="grid grid-cols-1 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>{employee.department}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{employee.téléphonePrincipal}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{employee.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>
              {employee.nationalité}, {age} ans
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>Embauché le {employee.dateEmbauche}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Satisfaction Client</span>
              <div className="flex items-center">
                <span>{employee.performance.satisfactionClient.toFixed(1)}</span>
                <Star className="h-3 w-3 text-yellow-500 ml-1" />
              </div>
            </div>
            <Bar
              displayPercentage={false}
              percentage={employee.performance.satisfactionClient * 20}
              color="bg-yellow-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Taux de Résolution</span>
              <span className="text-xs">{employee.performance.tauxResolution}</span>
            </div>
            <Bar
              displayPercentage={false}
              percentage={Number.parseInt(employee.performance.tauxResolution)}
              color="bg-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Appels Résolus</p>
              <p className="font-medium">{employee.performance.appelsResolus}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Durée Moyenne</p>
              <p className="font-medium">{employee.performance.dureeMoyenne}</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs">Taux de Présence</span>
              <span className="text-xs">{employee.performance.tauxPresence}</span>
            </div>
            <Bar displayPercentage={false} percentage={tauxPresence} color={getProgressColor(tauxPresence)} />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Heures Travaillées</p>
              <p className="font-medium">{employee.workloadPresence.heuresTravaillees}h</p>
            </div>
            <div>
              <p className="text-muted-foreground">Heures Prévues</p>
              <p className="font-medium">{employee.workloadPresence.heuresPrevues}h</p>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <Button onClick={onViewProfile} className="w-full">
            Voir le profil complet
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

