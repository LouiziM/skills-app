import { useState } from "react"
import { Plus } from "lucide-react"
import EvaluationTable from "./EvaluationTable"
import EvaluationFilter from "./EvaluationFilter"
import EvaluationForm from "./EvaluationForm"
import EvaluationDetails from "./EvaluationDetails"
import { evaluationsData } from "./evaluationsData"

export default function EvaluationView() {
  const [evaluations, setEvaluations] = useState(evaluationsData)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<string>("")
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [currentEvaluation, setCurrentEvaluation] = useState<any | null>(null)
  const [viewingEvaluation, setViewingEvaluation] = useState<any | null>(null)

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

  const handleEditEvaluation = (evaluation: any) => {
    setCurrentEvaluation(evaluation)
    setIsFormOpen(true)
  }

  const handleViewEvaluation = (evaluation: any) => {
    setViewingEvaluation(evaluation)
  }

  const handleDeleteEvaluation = (id: string) => {
    if (window.confirm("Are you sure you want to delete this evaluation?")) {
      setEvaluations(evaluations.filter((evaluation) => evaluation.id !== id))
    }
  }

  const handleSaveEvaluation = (evaluation: any) => {
    if (currentEvaluation) {
      // Edit existing evaluation
      setEvaluations(evaluations.map((e) => (e.id === evaluation.id ? evaluation : e)))
    } else {
      // Add new evaluation
      const newEvaluation = {
        ...evaluation,
        id: Date.now().toString(),
        date: new Date().toISOString().split("T")[0],
      }
      setEvaluations([...evaluations, newEvaluation])
    }
    setIsFormOpen(false)
  }

  return (
    <div className="ml-64 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Evaluation Management</h1>
        <button
          onClick={handleAddEvaluation}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Evaluation
        </button>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <EvaluationFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterType={filterType}
          setFilterType={setFilterType}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <EvaluationTable
          evaluations={filteredEvaluations}
          onView={handleViewEvaluation}
          onEdit={handleEditEvaluation}
          onDelete={handleDeleteEvaluation}
        />
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

