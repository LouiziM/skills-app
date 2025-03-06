import { Search, Filter } from "lucide-react"

interface SkillsFilterProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  filterType: string
  setFilterType: (type: string) => void
  filterLevel: string
  setFilterLevel: (level: string) => void
}

export default function SkillsFilter({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterLevel,
  setFilterLevel,
}: SkillsFilterProps) {
  return (
    <div className="p-4 border-b">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher des compétences..."
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
              <option value="">Tous les types</option>
              <option value="Technique">Technique</option>
              <option value="Comportemental">Comportemental</option>
            </select>
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              className="pl-10 pr-8 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Tous les niveaux</option>
              <option value="Débutant">Débutant</option>
              <option value="Intermédiaire">Intermédiaire</option>
              <option value="Avancé">Avancé</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}