import { Edit, Trash2 } from "lucide-react"

interface Skill {
  id: string
  name: string
  type: string
  level: string
  description: string
  createdAt: string
}

interface SkillsTableProps {
  skills: Skill[]
  onEdit: (skill: Skill) => void
  onDelete: (id: string) => void
}

export default function SkillsTable({ skills, onEdit, onDelete }: SkillsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Niveau</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Créé le</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {skills.length > 0 ? (
            skills.map((skill) => (
              <tr key={skill.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{skill.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      skill.type === "Technique" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {skill.type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      skill.level === "Débutant"
                        ? "bg-gray-100 text-gray-800"
                        : skill.level === "Intermédiaire"
                          ? "bg-yellow-100 text-yellow-800"
                          : skill.level === "Avancé"
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
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button onClick={() => onEdit(skill)} className="text-indigo-600 hover:text-indigo-900 mr-3">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(skill.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                Aucune compétence trouvée correspondant à vos critères
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}