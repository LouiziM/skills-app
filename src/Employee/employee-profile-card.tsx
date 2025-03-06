import { Briefcase, Mail, MapPin, Phone, Calendar, User, Globe } from "lucide-react"
import { Card, CardDescription, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import profileFemale from '../assets/profileFemale.png';
import profileMale from '../assets/profile.png';

type EmployeeProfileProps = {
  employee: {
    civilité: "M." | "Mme"
    nationalité: string // Added nationalité
    nom: string
    prénom: string
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
    skills: string[]
  }
}


// Function to calculate age from date of birth
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

export function EmployeeProfileCard({ employee }: EmployeeProfileProps) {
  const callAgentSkills = ["Communication", "Résolution", "Empathie", "CRM", "Multitâche"]
  const age = calculateAge(employee.dateDeNaissance) // Calculate age

  const getEmployeeImage = () => {
    if (employee.image) {
      return employee.image;
    }
    return employee?.civilité === "Mme" ? profileFemale : profileMale;
  }; 

  return (
    <Card className="mb-6 overflow-hidden ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {/* Section centrale avec background */}
        <div className="flex flex-col items-center p-6 bg-muted/50 sm:col-span-2 md:col-span-1 md:order-2">
          <div className="relative w-36 h-36   mb-4">
            <img
              src={getEmployeeImage()}
              alt={`${employee.nom} ${employee.prénom}`}
              className="rounded-full object-cover w-full h-full"
            />

          </div>

          <CardTitle className="text-xl text-center">
            {employee.civilité}. {employee.nom} {employee.prénom}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 mt-1">
            <Briefcase className="h-4 w-4" />
            {employee.position}
          </CardDescription>

          {/* Age and Nationality */}
          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
            <span>Âge: {age} ans</span>
            <Separator orientation="vertical" className="h-4" />
            <Globe className="h-4 w-4" />
            <span>{employee.nationalité}</span>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mt-4">
            {callAgentSkills.map((skill) => (
              <Badge key={skill} variant="secondary" className="bg-gray-200">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Section gauche */}
        <div className="p-6 flex flex-col justify-center space-y-4 md:order-1">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Département</h3>
            <p className="font-medium">{employee.department}</p>
          </div>

          <Separator />

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Contact</h3>
            <div className="space-y-2 mt-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{employee.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <div className="space-y-1">
                  <p>{employee.téléphonePrincipal}</p>
                  <p className="text-sm text-muted-foreground">Secondaire: {employee.téléphoneSecondaire}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <div>
                  <p>{employee.adresse}</p>
                  <p className="text-sm text-muted-foreground">{employee.ville}, {employee.pays}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile section */}
          <div className="sm:hidden space-y-4">
            <Separator />
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Date de naissance</h3>
              <div className="flex items-center gap-2 mt-1">
                <Calendar className="h-4 w-4" />
                <span>{employee.dateDeNaissance}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section droite */}
        <div className="p-6 flex flex-col justify-center space-y-4 md:order-3">
          <div className="grid gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Contrat</h3>
              <div className="flex items-center gap-2 mt-1">
                <User className="h-4 w-4" />
                <span>{employee.typeContrat}</span>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Date d'Embauche</h3>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span> {employee.dateEmbauche}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}