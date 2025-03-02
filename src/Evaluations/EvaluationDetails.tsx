import { X } from "lucide-react"

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

interface EvaluationDetailsProps {
  evaluation: Evaluation
  onClose: () => void
}

export default function EvaluationDetails({ evaluation, onClose }: EvaluationDetailsProps) {
  const averageScore =
    Object.values(evaluation.scores).reduce((sum, score) => sum + score, 0) / Object.values(evaluation.scores).length

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Evaluation Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Employee</h3>
              <p className="mt-1 text-lg">{evaluation.employeeName}</p>
              <p className="text-sm text-gray-500">ID: {evaluation.employeeId}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Evaluation Type</h3>
              <p className="mt-1">
                <span
                  className={`px-2 py-1 inline-flex text-sm font-semibold rounded-full ${
                    evaluation.type === "Manager" ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {evaluation.type}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date</h3>
              <p className="mt-1">{evaluation.date}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Period</h3>
              <p className="mt-1">
                {evaluation.periodStart} to {evaluation.periodEnd}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <p className="mt-1">
                <span
                  className={`px-2 py-1 inline-flex text-sm font-semibold rounded-full ${
                    evaluation.status === "Draft"
                      ? "bg-gray-100 text-gray-800"
                      : evaluation.status === "Submitted"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                  }`}
                >
                  {evaluation.status}
                </span>
              </p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Performance Scores</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ScoreDisplay label="Communication" value={evaluation.scores.communication} />
              <ScoreDisplay label="Technical Skills" value={evaluation.scores.technicalSkills} />
              <ScoreDisplay label="Problem Solving" value={evaluation.scores.problemSolving} />
              <ScoreDisplay label="Teamwork" value={evaluation.scores.teamwork} />
              <ScoreDisplay label="Customer Service" value={evaluation.scores.customerService} />
              <div className="md:col-span-2 mt-2 pt-2 border-t">
                <ScoreDisplay
                  label="Overall Average"
                  value={Number.parseFloat(averageScore.toFixed(1))}
                  isAverage={true}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Comments</h3>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="text-gray-700 whitespace-pre-line">{evaluation.comments}</p>
            </div>
          </div>

          <div className="text-sm text-gray-500">Created by: {evaluation.createdBy}</div>
        </div>

        <div className="flex justify-end p-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

interface ScoreDisplayProps {
  label: string
  value: number
  isAverage?: boolean
}

function ScoreDisplay({ label, value, isAverage = false }: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score < 2) return "bg-red-500"
    if (score < 3) return "bg-orange-500"
    if (score < 4) return "bg-yellow-500"
    if (score < 5) return "bg-green-500"
    return "bg-green-600"
  }

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className={`text-sm ${isAverage ? "font-semibold" : "font-medium"} text-gray-700`}>{label}</span>
        <span className={`text-sm ${isAverage ? "font-semibold" : ""} text-gray-700`}>{value}/5</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${getScoreColor(value)}`} style={{ width: `${(value / 5) * 100}%` }}></div>
      </div>
    </div>
  )
}

