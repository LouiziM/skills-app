"use client"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { EmployeeProfileCard } from "./employee-profile-card"
import { PerformanceCard } from "./performance-card"
import { WorkloadPresenceCard } from "./workload-presence-card"
import { TrainingCard } from "./training-card"
import { SkillsCard } from "./skills-card"
import { EmployeeFeedbackCard } from "./employee-feedback-card"

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
  projects: any[]
  formations: any[]
  skills: any[]
  feedback: any[]
}

type EmployeeProfileProps = {
  employee?: Employee
  onBack?: () => void
}

const EmployeeProfile=({ employee, onBack }: EmployeeProfileProps)=> {
  // Employé par défaut si aucun n'est fourni
  const defaultEmployee: Employee = {
    id: "1",
    civilité: "Mme",
    nom: "Doe",
    prénom: "Jane",
    nationalité: "Française",
    dateDeNaissance: "1990-03-15",
    téléphonePrincipal: "+33 1 23 45 67 89",
    téléphoneSecondaire: "+33 6 12 34 56 78",
    email: "jane.doe@company.com",
    pays: "France",
    ville: "Paris",
    adresse: "123 Rue de l'Exemple, 75001",
    dateEmbauche: "15 Mars 2020",
    typeContrat: "CDI",
    position: "Agent de Centre d'Appels",
    department: "Service Client",
    avatar: "/placeholder.svg?height=400&width=400",
    performance: {
      appelsResolus: 245,
      appelsEscalades: 32,
      appelsAbandonnes: 18,
      dureeMoyenne: "8m 30s",
      tempsAttenteMoyen: "1m 45s",
      tauxPresence: "95%",
      productiviteHoraire: 12,
      tauxResolution: "88%",
      satisfactionClient: 4.5,
    },
    workloadPresence: {
      heuresTravaillees: 152,
      heuresPrevues: 160,
      absences: 1,
      retards: 2,
      posteActuel: "Agent Senior",
      dateDebutPoste: "1 Janvier 2023",
      projetActuel: "Support Technique Télécom",
    },
    projects: [
      {
        id: "1",
        nom: "Support Technique Télécom",
        posteOccupé: "Agent Senior",
        dateDébut: "1 Janvier 2023",
        dateFin: "",
        manager: "Marie Martin",
        description: "Support technique pour les clients du secteur télécom.",
        créePar: "Marie Martin",
        créeLe: "15 Décembre 2022",
      },
      {
        id: "2",
        nom: "Service Client E-commerce",
        posteOccupé: "Agent",
        dateDébut: "1 Juin 2022",
        dateFin: "31 Décembre 2022",
        manager: "Pierre Dupont",
        description: "Gestion des appels pour une plateforme e-commerce.",
        créePar: "Pierre Dupont",
        créeLe: "15 Mai 2022",
      },
      {
        id: "3",
        nom: "Support Technique Logiciel",
        posteOccupé: "Agent Junior",
        dateDébut: "1 Janvier 2022",
        dateFin: "31 Mai 2022",
        manager: "Sophie Lefebvre",
        description: "Assistance technique pour les logiciels clients.",
        créePar: "Sophie Lefebvre",
        créeLe: "15 Décembre 2021",
      },
    ],
    formations: [
      {
        id: "1",
        titre: "Gestion avancée des appels difficiles",
        type: "Obligatoire",
        dateDébut: "15 Juillet 2023",
        dateFin: "20 Juillet 2023",
        statut: "À venir",
        formateur: "Jean Dupont",
        durée: "5 jours",
      },
      {
        id: "2",
        titre: "Nouveautés CRM 2023",
        type: "Optionnel",
        dateDébut: "1 Juin 2023",
        dateFin: "2 Juin 2023",
        statut: "Réussi",
        satisfaction: 4.5,
        formateur: "Sophie Martin",
        durée: "2 jours",
      },
      {
        id: "3",
        titre: "Techniques de vente avancées",
        type: "Obligatoire",
        dateDébut: "10 Mars 2023",
        dateFin: "12 Mars 2023",
        statut: "Réussi",
        satisfaction: 4.8,
        formateur: "Pierre Lefebvre",
        durée: "3 jours",
      },
    ],
    skills: [
      {
        id: "1",
        nom: "Gestion des appels",
        type: "Technique",
        niveau: "Expert",
        progression: 95,
        description: "Capacité à gérer efficacement les appels entrants et sortants.",
      },
      {
        id: "2",
        nom: "CRM",
        type: "Technique",
        niveau: "Avancé",
        progression: 80,
        description: "Maîtrise des outils CRM pour le suivi des clients.",
      },
      {
        id: "3",
        nom: "Résolution de problèmes",
        type: "Comportemental",
        niveau: "Intermédiaire",
        progression: 70,
        description: "Capacité à identifier et résoudre les problèmes rapidement.",
      },
      {
        id: "4",
        nom: "Vente additionnelle",
        type: "Technique",
        niveau: "Débutant",
        progression: 40,
        description: "Compétences de base en vente additionnelle.",
      },
    ],
    feedback: [
      {
        id: "1",
        type: "Performance",
        rating: 4.5,
        comment:
          "Jane démontre une excellente maîtrise des processus et une grande capacité à gérer les situations difficiles. Elle est un atout précieux pour l'équipe.",
        date: "15 Juin 2023",
        source: "Marie Martin (Manager)",
        pointsFort: "Gestion des appels complexes",
        pointsAmélioration: "Optimisation du temps de résolution",
      },
      {
        id: "2",
        type: "Peer",
        rating: 5,
        comment:
          "Toujours prête à aider ses collègues, Jane est une coéquipière exceptionnelle. Son attitude positive est contagieuse !",
        date: "2 Juin 2023",
        source: "Alex Dubois (Collègue)",
        pointsFort: "Esprit d'équipe",
        pointsAmélioration: "Partage des connaissances",
      },
      {
        id: "3",
        type: "Customer",
        rating: 4.8,
        comment:
          "J'ai été impressionné par la rapidité et l'efficacité avec lesquelles Jane a résolu mon problème. Un service client de première classe !",
        date: "28 Mai 2023",
        pointsFort: "Rapidité de résolution",
        pointsAmélioration: "Suivi post-résolution",
      },
      {
        id: "4",
        type: "Performance",
        rating: 4.2,
        comment:
          "Jane a montré une amélioration significative dans sa gestion du temps. Elle atteint constamment ses objectifs et contribue positivement à l'équipe.",
        date: "1 Avril 2023",
        source: "Pierre Dupont (Ancien Manager)",
        pointsFort: "Gestion du temps",
        pointsAmélioration: "Priorisation des tâches",
      },
      {
        id: "5",
        type: "Customer",
        rating: 4.5,
        comment:
          "Bien que mon problème n'ait pas été entièrement résolu, Jane a fait preuve d'une grande patience et a fourni des alternatives utiles.",
        date: "15 Mars 2023",
        pointsFort: "Patience et écoute",
        pointsAmélioration: "Suivi des solutions alternatives",
      },
    ],
  }

  const currentEmployee = employee || defaultEmployee

  return (
    <div className="container mx-auto py-6">
      {onBack && (
        <Button variant="outline" onClick={onBack} className="mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour à la liste
        </Button>
      )}

      {/* Main Employee Card */}
      <EmployeeProfileCard employee={currentEmployee} />

      {/* Performance and Workload Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <PerformanceCard performance={currentEmployee.performance} />
        <WorkloadPresenceCard workloadPresence={currentEmployee.workloadPresence} projects={currentEmployee.projects} />
      </div>

      {/* Training, Skills, and Feedback Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <TrainingCard formations={currentEmployee.formations} />
        <SkillsCard skills={currentEmployee.skills} />
        <EmployeeFeedbackCard feedback={currentEmployee.feedback} />
      </div>
    </div>
  )
}

export default EmployeeProfile;