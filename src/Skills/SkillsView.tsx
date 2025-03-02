import { useState } from "react"
import { Plus } from "lucide-react"
import SkillsTable from "./SkillsTable"
import SkillsFilter from "./SkillsFilter"
import SkillForm from "./SkillForm"
import { skillsData } from "./skillsData"

export default function SkillsView() {
  const [skills, setSkills] = useState(skillsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("")
  const [filterLevel, setFilterLevel] = useState<string>("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<any | null>(null)

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

  const handleEditSkill = (skill: any) => {
    setCurrentSkill(skill)
    setIsFormOpen(true)
  }

  const handleDeleteSkill = (id: string) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setSkills(skills.filter((skill) => skill.id !== id))
    }
  }

  const handleSaveSkill = (skill: any) => {
    if (currentSkill) {
      // Edit existing skill
      setSkills(skills.map((s) => (s.id === skill.id ? skill : s)))
    } else {
      // Add new skill
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
    <div className="ml-64 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Skills Management</h1>
        <button
          onClick={handleAddSkill}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Skill
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

