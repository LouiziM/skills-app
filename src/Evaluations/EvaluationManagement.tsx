import { useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { Plus, Edit, Trash2, Search, Filter, Eye } from "lucide-react"
import EvaluationForm from "./EvaluationForm"
import EvaluationDetails from "./EvaluationDetails"

// Types
interface Evaluation {
  id: string
  employeeId: string
  employeeName: string
  type: "Manager" | "Self"
  date: string
  periodStart: string
  periodEnd: string
  scores: {
    communication: number
    technicalSkills: number
    problemSolving: number
    teamwork: number
    customerService: number
  }
  comments: string
  status: "Draft" | "Submitted" | "Reviewed"
  createdBy: string
}

export default function EvaluationManagement() {
  const { user } = useAuth()
  const [evaluations, setEvaluations] = useState<Evaluation[]>([
    {
      id: "1",
      employeeId: "101",
      employeeName: "Jean Dupont",
      type: "Manager",
      date: "2023-06-15",
      periodStart: "2023-01-01",
      periodEnd: "2023-06-01",
      scores: {
        communication: 4,
        technicalSkills: 3,
        problemSolving: 4,
        teamwork: 5,
        customerService: 4,
      },
      comments:
        "Jean has shown excellent progress in customer service and teamwork. Technical skills could use some improvement.",
      status: "Reviewed",
      createdBy: "Manager",
    },
    {
      id: "2",
      employeeId: "102",
      employeeName: "Marie Lambert",
      type: "Self",
      date: "2023-07-10",
      periodStart: "2023-01-01",
      periodEnd: "2023-06-30",
      scores: {
        communication: 3,
        technicalSkills: 5,
        problemSolving: 4,
        teamwork: 3,
        customerService: 4,
      },
      comments:
        "I believe I have improved my technical skills significantly. I would like to work on my communication skills.",
      status: "Submitted",
      createdBy: "Employee",
    },
    {
      id: "3",
      employeeId: "103",
      employeeName: "Pierre Martin",
      type: "Manager",
      date: "2023-05-20",
      periodStart: "2022-11-01",
      periodEnd: "2023-04-30",
      scores: {
        communication: 2,
        technicalSkills: 4,
        problemSolving: 3,
        teamwork: 2,
        customerService: 3,
      },
      comments:
        "Pierre needs to improve his communication and teamwork. Technical skills are good but could be better utilized with improved collaboration.",
      status: "Reviewed",
      createdBy: "Manager",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentEvaluation, setCurrentEvaluation] = useState<Evaluation | null>(null)
  const [viewingEvaluation, setViewingEvaluation] = useState<Evaluation | null>(null)

  const canManageEvaluations = user?.role === "admin" || user?.role === "hr" || user?.role === "manager"

  const filteredEvaluations = evaluations.filter((evaluation) => {
    const matchesSearch =
      evaluation.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.comments.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType ? evaluation.type === filterType : true
    const matchesStatus = filterStatus ? evaluation.status === filterStatus : true

    return matchesSearch && matchesType && matchesStatus
  })

  const handleAddEvaluation = () => {
    setCurrentEvaluation(null)
    setIsFormOpen(true)
  }

  const handleEditEvaluation = (evaluation: Evaluation) => {
    setCurrentEvaluation(evaluation)
    setIsFormOpen(true)
  }

  const handleViewEvaluation = (evaluation: Evaluation) => {
    setViewingEvaluation(evaluation)
  }

  const handleDeleteEvaluation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this evaluation?")) {
      setEvaluations(evaluations.filter((evaluation) => evaluation.id !== id))
    }
  }

  const handleSaveEvaluation = (evaluation: Evaluation) => {
    if (currentEvaluation) {
      // Edit existing evaluation
      setEvaluations(evaluations.map((e) => (e.id === evaluation.id ? evaluation : e)))
    } else {
      // Add new evaluation
      const newEvaluation = {
        ...evaluation,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
        createdBy: user?.role || "Unknown",
      }
      setEvaluations([...evaluations, newEvaluation])
    }
    setIsFormOpen(false)
  }

  return (
    <div className="ml-64 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Evaluation Management</h1>
        {canManageEvaluations && (
          <button
            onClick={handleAddEvaluation}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Evaluation
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
                placeholder="Search evaluations..."
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
                  <option value="Manager">Manager</option>
                  <option value="Self">Self</option>
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
                  <option value="Draft">Draft</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Reviewed">Reviewed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Period
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEvaluations.length > 0 ? (
                filteredEvaluations.map((evaluation) => (
                  <tr key={evaluation.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{evaluation.employeeName}</div>
                      <div className="text-sm text-gray-500">ID: {evaluation.employeeId}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          evaluation.type === "Manager" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {evaluation.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{evaluation.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {evaluation.periodStart} to {evaluation.periodEnd}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          evaluation.status === "Draft"
                            ? "bg-gray-100 text-gray-800"
                            : evaluation.status === "Submitted"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {evaluation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleViewEvaluation(evaluation)}
                        className="text-gray-600 hover:text-gray-900 mr-3"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {canManageEvaluations && (
                        <>
                          <button
                            onClick={() => handleEditEvaluation(evaluation)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEvaluation(evaluation.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No evaluations found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isFormOpen && (
        <EvaluationForm
          evaluation={currentEvaluation}
          onSave={handleSaveEvaluation}
          onCancel={() => setIsFormOpen(false)}
        />
      )}

      {viewingEvaluation && (
        <EvaluationDetails evaluation={viewingEvaluation} onClose={() => setViewingEvaluation(null)} />
      )}
    </div>
  )
}

