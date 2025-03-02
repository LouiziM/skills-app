import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react"
import SkillForm from "./SkillForm"

// Types
interface Skill {
  id: string
  name: string
  type: "Technical" | "Behavioral"
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert"
  description: string
  createdAt: string
}

export default function SkillsManagement() {
  const { user } = useAuth()
  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "1",
      name: "Customer Communication",
      type: "Behavioral",
      level: "Advanced",
      description:
        "Ability to effectively communicate with customers, understand their needs, and provide clear explanations.",
      createdAt: "2023-05-15",
    },
    {
      id: "2",
      name: "Technical Troubleshooting",
      type: "Technical",
      level: "Intermediate",
      description: "Ability to diagnose and resolve technical issues through systematic problem-solving approaches.",
      createdAt: "2023-06-22",
    },
    {
      id: "3",
      name: "Product Knowledge",
      type: "Technical",
      level: "Expert",
      description:
        "In-depth understanding of product features, capabilities, and limitations to provide accurate information.",
      createdAt: "2023-04-10",
    },
    {
      id: "4",
      name: "Conflict Resolution",
      type: "Behavioral",
      level: "Intermediate",
      description:
        "Ability to handle difficult situations and resolve conflicts with customers in a professional manner.",
      createdAt: "2023-07-05",
    },
    {
      id: "5",
      name: "Time Management",
      type: "Behavioral",
      level: "Advanced",
      description: "Efficiently managing time to handle multiple tasks and customer inquiries effectively.",
      createdAt: "2023-03-18",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("")
  const [filterLevel, setFilterLevel] = useState<string>("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentSkill, setCurrentSkill] = useState<Skill | null>(null)

  const canManageSkills = user?.role === "admin" || user?.role === "hr"

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
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setSkills(skills.filter((skill) => skill.id !== id))
    }
  }

  const handleSaveSkill = (skill: Skill) => {
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
        {canManageSkills && (
          <button
            onClick={handleAddSkill}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex gap-4">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="pl-10 pr-8 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Types</option>
                  <option value="Technical">Technical</option>
                  <option value="Behavioral">Behavioral</option>
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="pl-10 pr-8 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                {canManageSkills && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSkills.length > 0 ? (
                filteredSkills.map((skill) => (
                  <tr key={skill.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{skill.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          skill.type === "Technical" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                        }`}
                      >
                        {skill.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          skill.level === "Beginner"
                            ? "bg-gray-100 text-gray-800"
                            : skill.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-800"
                              : skill.level === "Advanced"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-red-100 text-red-800"
                        }`}
                      >
                        {skill.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500 truncate max-w-xs">{skill.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{skill.createdAt}</td>
                    {canManageSkills && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEditSkill(skill)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDeleteSkill(skill.id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={canManageSkills ? 6 : 5} className="px-6 py-4 text-center text-sm text-gray-500">
                    No skills found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && <SkillForm skill={currentSkill} onSave={handleSaveSkill} onCancel={() => setIsFormOpen(false)} />}
    </div>
  )
}

