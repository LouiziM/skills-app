import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface Skill {
  id: string
  name: string
  type: string
  level: string
  description: string
  createdAt: string
}

interface SkillFormProps {
  skill: Skill | null
  onSave: (skill: Skill) => void
  onCancel: () => void
}

export default function SkillForm({ skill, onSave, onCancel }: SkillFormProps) {
  const [formData, setFormData] = useState<Omit<Skill, "id" | "createdAt"> & { id?: string; createdAt?: string }>({
    name: "",
    type: "Technique",
    level: "Débutant",
    description: "",
  })

  useEffect(() => {
    if (skill) {
      setFormData({
        id: skill.id,
        name: skill.name,
        type: skill.type,
        level: skill.level,
        description: skill.description,
        createdAt: skill.createdAt,
      })
    }
  }, [skill])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData as Skill)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{skill ? "Modifier la Compétence" : "Ajouter une Nouvelle Compétence"}</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la Compétence
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="grid mb-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="Technique">Technique</option>
                <option value="Comportemental">Comportemental</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              {skill ? "Mettre à jour la Compétence" : "Ajouter la Compétence"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}