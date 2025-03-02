import type React from "react"

import { useState, useEffect } from "react"
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

interface EvaluationFormProps {
  evaluation: Evaluation | null
  onSave: (evaluation: Evaluation) => void
  onCancel: () => void
}

export default function EvaluationForm({ evaluation, onSave, onCancel }: EvaluationFormProps) {
  const [formData, setFormData] = useState<
    Omit<Evaluation, "id" | "date" | "createdBy"> & { id?: string; date?: string; createdBy?: string }
  >({
    employeeId: "",
    employeeName: "",
    type: "Manager",
    periodStart: "",
    periodEnd: "",
    scores: {
      communication: 3,
      technicalSkills: 3,
      problemSolving: 3,
      teamwork: 3,
      customerService: 3,
    },
    comments: "",
    status: "Draft",
  })

  useEffect(() => {
    if (evaluation) {
      setFormData({
        id: evaluation.id,
        employeeId: evaluation.employeeId,
        employeeName: evaluation.employeeName,
        type: evaluation.type,
        date: evaluation.date,
        periodStart: evaluation.periodStart,
        periodEnd: evaluation.periodEnd,
        scores: { ...evaluation.scores },
        comments: evaluation.comments,
        status: evaluation.status,
        createdBy: evaluation.createdBy,
      })
    }
  }, [evaluation])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleScoreChange = (skill: keyof typeof formData.scores, value: number) => {
    setFormData((prev) => ({
      ...prev,
      scores: {
        ...prev.scores,
        [skill]: value,
      },
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as Evaluation)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl my-8">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{evaluation ? "Edit Evaluation" : "Add New Evaluation"}</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="employeeId" className="block text-sm font-medium text-gray-700 mb-1">
                Employee ID
              </label>
              <input
                type="text"
                id="employeeId"
                name="employeeId"
                value={formData.employeeId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="employeeName" className="block text-sm font-medium text-gray-700 mb-1">
                Employee Name
              </label>
              <input
                type="text"
                id="employeeName"
                name="employeeName"
                value={formData.employeeName}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Evaluation Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Manager">Manager</option>
                <option value="Self">Self</option>
              </select>
            </div>

            <div>
              <label htmlFor="periodStart" className="block text-sm font-medium text-gray-700 mb-1">
                Period Start
              </label>
              <input
                type="date"
                id="periodStart"
                name="periodStart"
                value={formData.periodStart}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="periodEnd" className="block text-sm font-medium text-gray-700 mb-1">
                Period End
              </label>
              <input
                type="date"
                id="periodEnd"
                name="periodEnd"
                value={formData.periodEnd}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-md font-medium text-gray-700 mb-2">Performance Scores</h3>
            <div className="space-y-3">
              <ScoreSlider
                label="Communication"
                value={formData.scores.communication}
                onChange={(value) => handleScoreChange("communication", value)}
              />
              <ScoreSlider
                label="Technical Skills"
                value={formData.scores.technicalSkills}
                onChange={(value) => handleScoreChange("technicalSkills", value)}
              />
              <ScoreSlider
                label="Problem Solving"
                value={formData.scores.problemSolving}
                onChange={(value) => handleScoreChange("problemSolving", value)}
              />
              <ScoreSlider
                label="Teamwork"
                value={formData.scores.teamwork}
                onChange={(value) => handleScoreChange("teamwork", value)}
              />
              <ScoreSlider
                label="Customer Service"
                value={formData.scores.customerService}
                onChange={(value) => handleScoreChange("customerService", value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
              Comments
            </label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Draft">Draft</option>
              <option value="Submitted">Submitted</option>
              <option value="Reviewed">Reviewed</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              {evaluation ? "Update Evaluation" : "Add Evaluation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

interface ScoreSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
}

function ScoreSlider({ label, value, onChange }: ScoreSliderProps) {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm text-gray-500">{value}/5</span>
      </div>
      <input
        type="range"
        min="1"
        max="5"
        value={value}
        onChange={(e) => onChange(Number.parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>Poor</span>
        <span>Average</span>
        <span>Excellent</span>
      </div>
    </div>
  )
}

