import { useState } from "react"
import { Search, ChevronDown, ChevronUp } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useMediaQuery } from "@/lib/use-media-query"
import { EmployeeSummaryCard } from "./employee-summary-card"
import EmployeeProfile from "@/EmployeeProfile/employee-profile"

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

const EmployeeList=()=>{
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<{ key: keyof Employee; direction: "ascending" | "descending" } | null>(
    null,
  )
  const [showProfile, setShowProfile] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Données fictives pour 10 employés
  const employees: Employee[] = [
    {
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
      ],
      feedback: [
        {
          id: "1",
          type: "Performance",
          rating: 4.5,
          comment:
            "Jane démontre une excellente maîtrise des processus et une grande capacité à gérer les situations difficiles.",
          date: "15 Juin 2023",
          source: "Marie Martin (Manager)",
        },
        {
          id: "2",
          type: "Peer",
          rating: 5,
          comment: "Toujours prête à aider ses collègues, Jane est une coéquipière exceptionnelle.",
          date: "2 Juin 2023",
          source: "Alex Dubois (Collègue)",
        },
      ],
    },
    {
      id: "2",
      civilité: "M.",
      nom: "Dupont",
      prénom: "Pierre",
      nationalité: "Française",
      dateDeNaissance: "1985-07-22",
      téléphonePrincipal: "+33 1 98 76 54 32",
      téléphoneSecondaire: "+33 6 87 65 43 21",
      email: "pierre.dupont@company.com",
      pays: "France",
      ville: "Lyon",
      adresse: "456 Avenue de la République, 69001",
      dateEmbauche: "5 Janvier 2019",
      typeContrat: "CDI",
      position: "Superviseur",
      department: "Service Client",
      avatar: "/placeholder.svg?height=400&width=400",
      performance: {
        appelsResolus: 180,
        appelsEscalades: 25,
        appelsAbandonnes: 10,
        dureeMoyenne: "7m 15s",
        tempsAttenteMoyen: "1m 30s",
        tauxPresence: "98%",
        productiviteHoraire: 14,
        tauxResolution: "92%",
        satisfactionClient: 4.8,
      },
      workloadPresence: {
        heuresTravaillees: 158,
        heuresPrevues: 160,
        absences: 0,
        retards: 1,
        posteActuel: "Superviseur",
        dateDebutPoste: "1 Juin 2022",
        projetActuel: "Optimisation Service Client",
      },
      projects: [
        {
          id: "1",
          nom: "Optimisation Service Client",
          posteOccupé: "Superviseur",
          dateDébut: "1 Juin 2022",
          dateFin: "",
          manager: "Jean Martin",
          description: "Projet d'amélioration des processus du service client.",
          créePar: "Jean Martin",
          créeLe: "15 Mai 2022",
        },
      ],
      formations: [
        {
          id: "1",
          titre: "Management d'équipe",
          type: "Obligatoire",
          dateDébut: "10 Mai 2022",
          dateFin: "15 Mai 2022",
          statut: "Réussi",
          satisfaction: 4.7,
          formateur: "Marie Dubois",
          durée: "5 jours",
        },
      ],
      skills: [
        {
          id: "1",
          nom: "Leadership",
          type: "Comportemental",
          niveau: "Expert",
          progression: 90,
          description: "Capacité à diriger et motiver une équipe.",
        },
      ],
      feedback: [
        {
          id: "1",
          type: "Performance",
          rating: 4.8,
          comment: "Pierre est un excellent superviseur qui sait motiver son équipe.",
          date: "20 Mai 2023",
          source: "Jean Martin (Manager)",
        },
      ],
    },
    {
      id: "3",
      civilité: "Mme",
      nom: "Martin",
      prénom: "Sophie",
      nationalité: "Française",
      dateDeNaissance: "1992-11-05",
      téléphonePrincipal: "+33 1 45 67 89 01",
      téléphoneSecondaire: "+33 6 54 32 10 98",
      email: "sophie.martin@company.com",
      pays: "France",
      ville: "Marseille",
      adresse: "789 Boulevard du Port, 13001",
      dateEmbauche: "20 Avril 2021",
      typeContrat: "CDD",
      position: "Agent de Centre d'Appels",
      department: "Support Technique",
      avatar: "/placeholder.svg?height=400&width=400",
      performance: {
        appelsResolus: 220,
        appelsEscalades: 28,
        appelsAbandonnes: 15,
        dureeMoyenne: "9m 10s",
        tempsAttenteMoyen: "2m 00s",
        tauxPresence: "92%",
        productiviteHoraire: 11,
        tauxResolution: "85%",
        satisfactionClient: 4.2,
      },
      workloadPresence: {
        heuresTravaillees: 145,
        heuresPrevues: 160,
        absences: 2,
        retards: 3,
        posteActuel: "Agent",
        dateDebutPoste: "20 Avril 2021",
        projetActuel: "Support Technique Logiciel",
      },
      projects: [
        {
          id: "1",
          nom: "Support Technique Logiciel",
          posteOccupé: "Agent",
          dateDébut: "20 Avril 2021",
          dateFin: "",
          manager: "Thomas Petit",
          description: "Support technique pour les logiciels clients.",
          créePar: "Thomas Petit",
          créeLe: "15 Avril 2021",
        },
      ],
      formations: [
        {
          id: "1",
          titre: "Support technique niveau 2",
          type: "Obligatoire",
          dateDébut: "1 Mai 2021",
          dateFin: "5 Mai 2021",
          statut: "Réussi",
          satisfaction: 4.2,
          formateur: "Pierre Leroy",
          durée: "5 jours",
        },
      ],
      skills: [
        {
          id: "1",
          nom: "Dépannage technique",
          type: "Technique",
          niveau: "Intermédiaire",
          progression: 75,
          description: "Capacité à diagnostiquer et résoudre des problèmes techniques.",
        },
      ],
      feedback: [
        {
          id: "1",
          type: "Customer",
          rating: 4.2,
          comment: "Sophie a résolu mon problème rapidement et efficacement.",
          date: "10 Juin 2023",
        },
      ],
    },
    {
      id: "4",
      civilité: "M.",
      nom: "Petit",
      prénom: "Thomas",
      nationalité: "Française",
      dateDeNaissance: "1988-02-14",
      téléphonePrincipal: "+33 1 23 45 67 89",
      téléphoneSecondaire: "+33 6 12 34 56 78",
      email: "thomas.petit@company.com",
      pays: "France",
      ville: "Toulouse",
      adresse: "101 Rue des Fleurs, 31000",
      dateEmbauche: "10 Septembre 2018",
      typeContrat: "CDI",
      position: "Agent Senior",
      department: "Service Client",
      avatar: "/placeholder.svg?height=400&width=400",
      performance: {
        appelsResolus: 260,
        appelsEscalades: 20,
        appelsAbandonnes: 12,
        dureeMoyenne: "6m 45s",
        tempsAttenteMoyen: "1m 20s",
        tauxPresence: "97%",
        productiviteHoraire: 15,
        tauxResolution: "93%",
        satisfactionClient: 4.7,
      },
      workloadPresence: {
        heuresTravaillees: 157,
        heuresPrevues: 160,
        absences: 0,
        retards: 1,
        posteActuel: "Agent Senior",
        dateDebutPoste: "1 Mars 2022",
        projetActuel: "Service Client E-commerce",
      },
      projects: [
        {
          id: "1",
          nom: "Service Client E-commerce",
          posteOccupé: "Agent Senior",
          dateDébut: "1 Mars 2022",
          dateFin: "",
          manager: "Pierre Dupont",
          description: "Gestion des appels pour une plateforme e-commerce.",
          créePar: "Pierre Dupont",
          créeLe: "15 Février 2022",
        },
      ],
      formations: [
        {
          id: "1",
          titre: "Techniques de vente avancées",
          type: "Obligatoire",
          dateDébut: "10 Février 2022",
          dateFin: "12 Février 2022",
          statut: "Réussi",
          satisfaction: 4.6,
          formateur: "Marie Dubois",
          durée: "3 jours",
        },
      ],
      skills: [
        {
          id: "1",
          nom: "Vente additionnelle",
          type: "Technique",
          niveau: "Expert",
          progression: 90,
          description: "Capacité à proposer des produits ou services complémentaires.",
        },
      ],
      feedback: [
        {
          id: "1",
          type: "Performance",
          rating: 4.7,
          comment: "Thomas est un agent exemplaire qui dépasse régulièrement ses objectifs.",
          date: "5 Juin 2023",
          source: "Pierre Dupont (Manager)",
        },
      ],
    },
    {
      id: "5",
      civilité: "Mme",
      nom: "Dubois",
      prénom: "Marie",
      nationalité: "Française",
      dateDeNaissance: "1991-09-30",
      téléphonePrincipal: "+33 1 98 76 54 32",
      téléphoneSecondaire: "+33 6 87 65 43 21",
      email: "marie.dubois@company.com",
      pays: "France",
      ville: "Bordeaux",
      adresse: "202 Avenue des Vignes, 33000",
      dateEmbauche: "3 Février 2020",
      typeContrat: "CDI",
      position: "Agent de Centre d'Appels",
      department: "Support Technique",
      avatar: "/placeholder.svg?height=400&width=400",
      performance: {
        appelsResolus: 210,
        appelsEscalades: 35,
        appelsAbandonnes: 20,
        dureeMoyenne: "10m 00s",
        tempsAttenteMoyen: "2m 15s",
        tauxPresence: "90%",
        productiviteHoraire: 10,
        tauxResolution: "82%",
        satisfactionClient: 4.0,
      },
      workloadPresence: {
        heuresTravaillees: 140,
        heuresPrevues: 160,
        absences: 3,
        retards: 4,
        posteActuel: "Agent",
        dateDebutPoste: "3 Février 2020",
        projetActuel: "Support Technique Télécom",
      },
      projects: [
        {
          id: "1",
          nom: "Support Technique Télécom",
          posteOccupé: "Agent",
          dateDébut: "3 Février 2020",
          dateFin: "",
          manager: "Thomas Petit",
          description: "Support technique pour les clients du secteur télécom.",
          créePar: "Thomas Petit",
          créeLe: "1 Février 2020",
        },
      ],
      formations: [
        {
          id: "1",
          titre: "Support technique niveau 1",
          type: "Obligatoire",
          dateDébut: "10 Février 2020",
          dateFin: "15 Février 2020",
          statut: "Réussi",
          satisfaction: 4.0,
          formateur: "Pierre Leroy",
          durée: "5 jours",
        },
      ],
      skills: [
        {
          id: "1",
          nom: "Dépannage technique",
          type: "Technique",
          niveau: "Débutant",
          progression: 60,
          description: "Capacité à diagnostiquer et résoudre des problèmes techniques.",
        },
      ],
      feedback: [
        {
          id: "1",
          type: "Customer",
          rating: 4.0,
          comment: "Marie a été patiente et a résolu mon problème.",
          date: "1 Juin 2023",
        },
      ],
    },
    {
      id: "6",
      civilité: "M.",
      nom: "Leroy",
      prénom: "Nicolas",
      nationalité: "Française",
      dateDeNaissance: "1987-05-18",
      téléphonePrincipal: "+33 1 45 67 89 01",
      téléphoneSecondaire: "+33 6 54 32 10 98",
      email: "nicolas.leroy@company.com",
      pays: "France",
      ville: "Lille",
      adresse: "303 Rue du Nord, 59000",
      dateEmbauche: "15 Juillet 2017",
      typeContrat: "CDI",
      position: "Formateur",
      department: "Formation",
      avatar: "/placeholder.svg?height=400&width=400",
      performance: {
        appelsResolus: 150,
        appelsEscalades: 15,
        appelsAbandonnes: 8,
        dureeMoyenne: "8m 00s",
        tempsAttenteMoyen: "1m 30s",
        tauxPresence: "99%",
        productiviteHoraire: 13,
        tauxResolution: "95%",
        satisfactionClient: 4.9,
      },
      workloadPresence: {
        heuresTravaillees: 160,
        heuresPrevues: 160,
        absences: 0,
        retards: 0,
        posteActuel: "Formateur",
        dateDebutPoste: "1 Janvier 2023",
        projetActuel: "Formation Nouveaux Agents",
      },
      projects: [
        {
          id: "1",
          nom: "Formation Nouveaux Agents",
          posteOccupé: "Formateur",
          dateDébut: "1 Janvier 2023",
          dateFin: "",
          manager: "Jean Martin",
          description: "Formation des nouveaux agents du centre d'appels.",
          créePar: "Jean Martin",
          créeLe: "15 Décembre 2022",
        },
      ],
      formations: [
        {
          id: "1",
          titre: "Formation de formateurs",
          type: "Obligatoire",
          dateDébut: "1 Décembre 2022",
          dateFin: "10 Décembre 2022",
          statut: "Réussi",
          satisfaction: 4.9,
          formateur: "Marie Dubois",
          durée: "10 jours",
        },
      ],
      skills: [
        {
          id: "1",
          nom: "Pédagogie",
          type: "Comportemental",
          niveau: "Expert",
          progression: 95,
          description: "Capacité à transmettre des connaissances et compétences.",
        },
      ],
      feedback: [
        {
          id: "1",
          type: "Peer",
          rating: 4.9,
          comment: "Nicolas est un formateur exceptionnel qui sait s'adapter à chaque apprenant.",
          date: "15 Mai 2023",
          source: "Marie Dubois (Collègue)",
        },
      ],
    },
    {
      id: "7",
      civilité: "Mme",
      nom: "Moreau",
      prénom: "Julie",
      nationalité: "Française",
      dateDeNaissance: "1993-12-10",
      téléphonePrincipal: "+33 1 23 45 67 89",
      téléphoneSecondaire: "+33 6 12 34 56 78",
      email: "julie.moreau@company.com",
      pays: "France",
      ville: "Nantes",
      adresse: "404 Boulevard de l'Océan, 44000",
      dateEmbauche: "8 Mars 2022",
      typeContrat: "CDD",
      position: "Agent de Centre d'Appels",
      department: "Service Client",
      avatar: "/placeholder.svg?height=400&width=400",
      performance: {
        appelsResolus: 190,
        appelsEscalades: 30,
        appelsAbandonnes: 22,
        dureeMoyenne: "9m 30s",
        tempsAttenteMoyen: "2m 10s",
        tauxPresence: "88%",
        productiviteHoraire: 9,
        tauxResolution: "80%",
        satisfactionClient: 3.8,
      },
      workloadPresence: {
        heuresTravaillees: 135,
        heuresPrevues: 160,
        absences: 4,
        retards: 5,
        posteActuel: "Agent Junior",
        dateDebutPoste: "8 Mars 2022",
        projetActuel: "Service Client E-commerce",
      },
      projects: [
        {
          id: "1",
          nom: "Service Client E-commerce",
          posteOccupé: "Agent Junior",
          dateDébut: "8 Mars 2022",
          dateFin: "",
          manager: "Pierre Dupont",
          description: "Gestion des appels pour une plateforme e-commerce.",
          créePar: "Pierre Dupont",
          créeLe: "1 Mars 2022",
        },
      ],
      formations: [
        {
          id: "1",
          titre: "Initiation au service client",
          type: "Obligatoire",
          dateDébut: "10 Mars 2022",
          dateFin: "15 Mars 2022",
          statut: "Réussi",
          satisfaction: 3.8,
          formateur: "Nicolas Leroy",
          durée: "5 jours",
        },
      ],
      skills: [
        {
          id: "1",
          nom: "Communication client",
          type: "Comportemental",
          niveau: "Débutant",
          progression: 50,
          description: "Capacité à communiquer efficacement avec les clients.",
        },
      ],
      feedback: [
        {
          id: "1",
          type: "Performance",
          rating: 3.8,
          comment: "Julie progresse mais doit encore améliorer sa gestion du temps.",
          date: "1 Juin 2023",
          source: "Pierre Dupont (Manager)",
        },
      ],
    },
    {
      id: "8",
      civilité: "M.",
      nom: "Simon",
      prénom: "Lucas",
      nationalité: "Française",
      dateDeNaissance: "1989-08-25",
      téléphonePrincipal: "+33 1 98 76 54 32",
      téléphoneSecondaire: "+33 6 87 65 43 21",
      email: "lucas.simon@company.com",
      pays: "France",
      ville: "Strasbourg",
      adresse: "505 Rue de l'Europe, 67000",
      dateEmbauche: "22 Novembre 2019",
      typeContrat: "CDI",
      position: "Agent Senior",
      department: "Support Technique",
      avatar: "/placeholder.svg?height=400&width=400",
      performance: {
        appelsResolus: 230,
        appelsEscalades: 22,
        appelsAbandonnes: 14,
        dureeMoyenne: "7m 30s",
        tempsAttenteMoyen: "1m 40s",
        tauxPresence: "96%",
        productiviteHoraire: 14,
        tauxResolution: "90%",
        satisfactionClient: 4.6,
      },
      workloadPresence: {
        heuresTravaillees: 155,
        heuresPrevues: 160,
        absences: 1,
        retards: 0,
        posteActuel: "Agent Senior",
        dateDebutPoste: "1 Juin 2022",
        projetActuel: "Support Technique Logiciel",
      },
      projects: [
        {
          id: "1",
          nom: "Support Technique Logiciel",
          posteOccupé: "Agent Senior",
          dateDébut: "1 Juin 2022",
          dateFin: "",
          manager: "Thomas Petit",
          description: "Support technique pour les logiciels clients.",
          créePar: "Thomas Petit",
          créeLe: "15 Mai 2022",
        },
      ],
      formations: [
        {
          id: "1",
          titre: "Support technique avancé",
          type: "Obligatoire",
          dateDébut: "15 Mai 2022",
          dateFin: "20 Mai 2022",
          statut: "Réussi",
          satisfaction: 4.6,
          formateur: "Nicolas Leroy",
          durée: "5 jours",
        },
      ],
      skills: [
        {
          id: "1",
          nom: "Résolution de problèmes complexes",
          type: "Technique",
          niveau: "Avancé",
          progression: 85,
          description: "Capacité à résoudre des problèmes techniques complexes.",
        },
      ],
      feedback: [
        {
          id: "1",
          type: "Customer",
          rating: 4.6,
          comment: "Lucas a résolu mon problème complexe rapidement et efficacement.",
          date: "10 Juin 2023",
        },
      ],
    },
    {
      id: "9",
      civilité: "Mme",
      nom: "Lefebvre",
      prénom: "Emma",
      nationalité: "Française",
      dateDeNaissance: "1994-04-02",
      téléphonePrincipal: "+33 1 45 67 89 01",
      téléphoneSecondaire: "+33 6 54 32 10 98",
      email: "emma.lefebvre@company.com",
      pays: "France",
      ville: "Rennes",
      adresse: "606 Avenue du Parc, 35000",
      dateEmbauche: "17 Mai 2021",
      typeContrat: "CDI",
      position: "Agent de Centre d'Appels",
      department: "Service Client",
      avatar: "/placeholder.svg?height=400&width=400",
      performance: {
        appelsResolus: 200,
        appelsEscalades: 27,
        appelsAbandonnes: 16,
        dureeMoyenne: "8m 45s",
        tempsAttenteMoyen: "1m 55s",
        tauxPresence: "93%",
        productiviteHoraire: 11,
        tauxResolution: "86%",
        satisfactionClient: 4.3,
      },
      workloadPresence: {
        heuresTravaillees: 148,
        heuresPrevues: 160,
        absences: 2,
        retards: 2,
        posteActuel: "Agent",
        dateDebutPoste: "17 Mai 2021",
        projetActuel: "Service Client E-commerce",
      },
      projects: [
        {
          id: "1",
          nom: "Service Client E-commerce",
          posteOccupé: "Agent",
          dateDébut: "17 Mai 2021",
          dateFin: "",
          manager: "Pierre Dupont",
          description: "Gestion des appels pour une plateforme e-commerce.",
          créePar: "Pierre Dupont",
          créeLe: "10 Mai 2021",
        },
      ],
      formations: [
        {
          id: "1",
          titre: "Service client niveau 2",
          type: "Obligatoire",
          dateDébut: "20 Mai 2021",
          dateFin: "25 Mai 2021",
          statut: "Réussi",
          satisfaction: 4.3,
          formateur: "Nicolas Leroy",
          durée: "5 jours",
        },
      ],
      skills: [
        {
          id: "1",
          nom: "Gestion des réclamations",
          type: "Comportemental",
          niveau: "Intermédiaire",
          progression: 75,
          description: "Capacité à gérer les réclamations clients avec diplomatie.",
        },
      ],
      feedback: [
        {
          id: "1",
          type: "Customer",
          rating: 4.3,
          comment: "Emma a été très professionnelle et a résolu mon problème.",
          date: "5 Juin 2023",
        },
      ],
    },
    {
      id: "10",
      civilité: "M.",
      nom: "Fournier",
      prénom: "Maxime",
      nationalité: "Française",
      dateDeNaissance: "1986-01-12",
      téléphonePrincipal: "+33 1 23 45 67 89",
      téléphoneSecondaire: "+33 6 12 34 56 78",
      email: "maxime.fournier@company.com",
      pays: "France",
      ville: "Montpellier",
      adresse: "707 Rue du Soleil, 34000",
      dateEmbauche: "30 Août 2018",
      typeContrat: "CDI",
      position: "Superviseur",
      department: "Support Technique",
      avatar: "/placeholder.svg?height=400&width=400",
      performance: {
        appelsResolus: 170,
        appelsEscalades: 18,
        appelsAbandonnes: 9,
        dureeMoyenne: "7m 00s",
        tempsAttenteMoyen: "1m 25s",
        tauxPresence: "97%",
        productiviteHoraire: 13,
        tauxResolution: "94%",
        satisfactionClient: 4.7,
      },
      workloadPresence: {
        heuresTravaillees: 156,
        heuresPrevues: 160,
        absences: 1,
        retards: 0,
        posteActuel: "Superviseur",
        dateDebutPoste: "1 Janvier 2023",
        projetActuel: "Optimisation Support Technique",
      },
      projects: [
        {
          id: "1",
          nom: "Optimisation Support Technique",
          posteOccupé: "Superviseur",
          dateDébut: "1 Janvier 2023",
          dateFin: "",
          manager: "Jean Martin",
          description: "Projet d'amélioration des processus du support technique.",
          créePar: "Jean Martin",
          créeLe: "15 Décembre 2022",
        },
      ],
      formations: [
        {
          id: "1",
          titre: "Management d'équipe technique",
          type: "Obligatoire",
          dateDébut: "10 Décembre 2022",
          dateFin: "15 Décembre 2022",
          statut: "Réussi",
          satisfaction: 4.7,
          formateur: "Nicolas Leroy",
          durée: "5 jours",
        },
      ],
      skills: [
        {
          id: "1",
          nom: "Management technique",
          type: "Comportemental",
          niveau: "Expert",
          progression: 90,
          description: "Capacité à diriger une équipe technique.",
        },
      ],
      feedback: [
        {
          id: "1",
          type: "Performance",
          rating: 4.7,
          comment: "Maxime est un excellent superviseur technique.",
          date: "1 Juin 2023",
          source: "Jean Martin (Manager)",
        },
      ],
    },
  ]

  // Fonction pour trier les employés
  const sortedEmployees = [...employees].sort((a, b) => {
    if (sortConfig !== null) {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
    }
    return 0
  })

  // Fonction pour filtrer les employés
  const filteredEmployees = sortedEmployees.filter(
    (employee) =>
      employee.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.prénom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Fonction pour gérer le tri
  const requestSort = (key: keyof Employee) => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  // Fonction pour gérer le clic sur une ligne
  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowProfile(false)
  }

  // Fonction pour naviguer vers le profil complet
  const navigateToProfile = (employee: Employee) => {
    setShowProfile(true)
  }

  // Si on affiche le profil complet
  if (showProfile && selectedEmployee) {
    return <EmployeeProfile employee={selectedEmployee} onBack={() => setShowProfile(false)} />
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Liste des Employés</h1>

      {/* Barre de recherche */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher un employé..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Grille principale */}
      <div className={`grid ${isMobile ? "grid-cols-1 gap-6" : "grid-cols-3 gap-4"}`}>
        {/* Tableau des employés */}
        <div className={isMobile ? "col-span-1" : "col-span-2"}>
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("nom")}>
                        Nom
                        {sortConfig?.key === "nom" &&
                          (sortConfig.direction === "ascending" ? (
                            <ChevronUp className="inline ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="inline ml-1 h-4 w-4" />
                          ))}
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => requestSort("position")}>
                        Poste
                        {sortConfig?.key === "position" &&
                          (sortConfig.direction === "ascending" ? (
                            <ChevronUp className="inline ml-1 h-4 w-4" />
                          ) : (
                            <ChevronDown className="inline ml-1 h-4 w-4" />
                          ))}
                      </TableHead>
                      {!isMobile && (
                        <TableHead className="cursor-pointer" onClick={() => requestSort("department")}>
                          Département
                          {sortConfig?.key === "department" &&
                            (sortConfig.direction === "ascending" ? (
                              <ChevronUp className="inline ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="inline ml-1 h-4 w-4" />
                            ))}
                        </TableHead>
                      )}
                      {!isMobile && (
                        <TableHead className="cursor-pointer" onClick={() => requestSort("email")}>
                          Email
                          {sortConfig?.key === "email" &&
                            (sortConfig.direction === "ascending" ? (
                              <ChevronUp className="inline ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="inline ml-1 h-4 w-4" />
                            ))}
                        </TableHead>
                      )}
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEmployees.map((employee) => (
                      <TableRow
                        key={employee.id}
                        className="cursor-pointer hover:bg-muted"
                        onClick={() => handleRowClick(employee)}
                      >
                        <TableCell className="font-medium">
                          {employee.civilité} {employee.prénom} {employee.nom}
                        </TableCell>
                        <TableCell>{employee.position}</TableCell>
                        {!isMobile && <TableCell>{employee.department}</TableCell>}
                        {!isMobile && <TableCell>{employee.email}</TableCell>}
                        <TableCell>
                          <Badge
                            className={
                              employee.performance.satisfactionClient >= 4.5
                                ? "bg-green-500"
                                : employee.performance.satisfactionClient >= 4.0
                                  ? "bg-blue-500"
                                  : employee.performance.satisfactionClient >= 3.5
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                            }
                          >
                            {employee.performance.satisfactionClient.toFixed(1)}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Carte de résumé de l'employé sélectionné */}
        {selectedEmployee && (
          <div className={isMobile ? "col-span-1 mt-6" : "col-span-1"}>
            <div className="h-full">
              <EmployeeSummaryCard
                employee={selectedEmployee}
                onViewProfile={() => navigateToProfile(selectedEmployee)}
                onClose={() => setSelectedEmployee(null)}
                compact={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default  EmployeeList;