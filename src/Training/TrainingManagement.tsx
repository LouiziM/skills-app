"use client"

import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Plus, Edit, Trash2, Search, Filter, Users, Calendar } from "lucide-react"
import TrainingForm from "./TrainingForm"

// Types
interface Training {
  id: string
  title: string
  type: "Mandatory" | "Optional"
  startDate: string
  endDate: string
  description: string
  skills: string[]
  status: "Planned" | "In Progress" | "Completed"
  participants: number
  createdBy: string
  createdAt: string
}

export default function TrainingManagement() {
  const { user } = useAuth()
  const [trainings, setTrainings] = useState<Training[]>([
    {
      id: "1",
      title: "Customer Service Excellence",
      type: "Mandatory",
      startDate: "2023-08-15",
      endDate: "2023-08-20",
      description:
        "Learn advanced techniques for handling difficult customer situations and improving satisfaction scores.",
      skills: ["Communication", "Customer Service", "Conflict Resolution"],
      status: "Planned",
      participants: 15,
      createdBy: "HR",
      createdAt: "2023-07-10",
    },
    {
      id: "2",
      title: "Technical Support Fundamentals",
      type: "Mandatory",
      startDate: "2023-09-05",
      endDate: "2023-09-15",
      description: "Core technical support skills including troubleshooting methodologies and system diagnostics.",
      skills: ["Technical Troubleshooting", "Product Knowledge", "Problem Solving"],
      status: "Planned",
      participants: 22,
      createdBy: "Manager",
      createdAt: "2023-07-15",
    },
    {
      id: "3",
      title: "Advanced Communication Skills",
      type: "Optional",
      startDate: "2023-07-10",
      endDate: "2023-07-12",
      description: "Enhance your communication skills for better team collaboration and customer interactions.",
      skills: ["Communication", "Teamwork"],
      status: "Completed",
      participants: 8,
      createdBy: "HR",
      createdAt: "2023-06-01",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentTraining, setCurrentTraining] = useState<Training | null>(null)

  const canManageTrainings = user?.role === "admin" || user?.role === "hr"

  const filteredTrainings = trainings.filter((training) => {
    const matchesSearch =
      training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      training.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesType = filterType ? training.type === filterType : true
    const matchesStatus = filterStatus ? training.status === filterStatus : true

    return matchesSearch && matchesType && matchesStatus
  })

  const handleAddTraining = () => {
    setCurrentTraining(null)
    setIsFormOpen(true)
  }

  const handleEditTraining = (training: Training) => {
    setCurrentTraining(training)
    setIsFormOpen(true)
  }

  const handleDeleteTraining = (id: string) => {
    if (window.confirm("Are you sure you want to delete this training?")) {
      setTrainings(trainings.filter((training) => training.id !== id))
    }
  }

  const handleSaveTraining = (training: Training) => {
    if (currentTraining) {
      // Edit existing training
      setTrainings(trainings.map((t) => (t.id === training.id ? training : t)))
    } else {
      // Add new training
      const newTraining = {
        ...training,
        id: Date.now().toString(),
        createdBy: user?.role || "Unknown",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTrainings([...trainings, newTraining])
    }
    setIsFormOpen(false)
  }

  return (
    <div className="ml-64 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Training Management</h1>
        {canManageTrainings && (
          <button
            onClick={handleAddTraining}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Training
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
                placeholder="Search trainings or skills..."
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
                  <option value="Mandatory">Mandatory</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>

              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="">All Statuses</option>
                  <option value="Planned">Planned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredTrainings.length > 0 ? (
            filteredTrainings.map((training) => (
              <div
                key={training.id}
                className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-4 border-b">
                  <div className="flex justify-between items-start">
                    <h3 className="font-medium text-lg">{training.title}</h3>
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        training.type === "Mandatory" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {training.type}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">{training.description}</p>
                </div>

                <div className="px-4 py-3 bg-gray-50">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    {training.startDate} to {training.endDate}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-2" />
                    {training.participants} participants
                  </div>
                </div>

                <div className="px-4 py-3 border-t">
                  <div className="mb-2">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        training.status === "Planned"
                          ? "bg-yellow-100 text-yellow-800"
                          : training.status === "In Progress"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                      }`}
                    >
                      {training.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {training.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {canManageTrainings && (
                  <div className="px-4 py-3 border-t flex justify-end">
                    <button
                      onClick={() => handleEditTraining(training)}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteTraining(training.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-3 p-4 text-center text-gray-500">No trainings found matching your criteria</div>
          )}
        </div>
      </div>

      {isFormOpen && (
        <TrainingForm training={currentTraining} onSave={handleSaveTraining} onCancel={() => setIsFormOpen(false)} />
      )}
    </div>
  )
}

