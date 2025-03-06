import { useState } from "react"
import { Plus } from "lucide-react"
import SkillsTable from "./SkillsTable"
import SkillsFilter from "./SkillsFilter"
import SkillForm from "./SkillForm"
import { skillsData } from "./skillsData"

// Définir le type Skill pour éviter les erreurs de type
interface Skill {
  id: string
  name: string
  type: string
  level: string
  description: string
  createdAt: string
}

export default function SkillsView() {
  const [skills, setSkills] = useState<Skill[]>(skillsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("")
  const [filterLevel, setFilterLevel] = useState<string>("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null)

  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType ? skill.type === filterType : true
    const matchesLevel = filterLevel ? skill.level === filterLevel : true

    return matchesSearch && matchesType && matchesLevel
  })

  const handleAddSkill = () => {
    setCurrentSkill(null)
    setIsFormOpen(true)
  }

  const handleEditSkill = (skill: Skill) => {
    setCurrentSkill(skill)
    setIsFormOpen(true)
  }

  const handleDeleteSkill = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette compétence ?")) {
      setSkills(skills.filter((skill) => skill.id !== id))
    }
  }

  const handleSaveSkill = (skill: Skill) => {
    if (currentSkill) {
      // Modifier une compétence existante
      setSkills(skills.map((s) => (s.id === skill.id ? skill : s)))
    } else {
      // Ajouter une nouvelle compétence
      const newSkill = {
        ...skill,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
      }
      setSkills([...skills, newSkill])
    }
    setIsFormOpen(false)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Compétences</h1>
        <button
          onClick={handleAddSkill}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une Compétence
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <SkillsFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterLevel={filterLevel}
          setFilterLevel={setFilterLevel}
        />

        <SkillsTable skills={filteredSkills} onEdit={handleEditSkill} onDelete={handleDeleteSkill} />
      </div>

      {isFormOpen && <SkillForm skill={currentSkill} onSave={handleSaveSkill} onCancel={() => setIsFormOpen(false)} />}
    </div>
  )
}