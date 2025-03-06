import { useSidebar } from "./sidebar-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  ClipboardCheck,
  GraduationCap,
  BarChart3,
  Bell,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface SidebarProps {
  onNavigate: (page: string) => void
  currentPage: string
}

export default function Sidebar({ onNavigate, currentPage }: SidebarProps) {
  const { open, toggleSidebar } = useSidebar()

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "evaluations", label: "Evaluations", icon: ClipboardCheck },
    { id: "trainings", label: "Trainings", icon: GraduationCap },
    { id: "competencies", label: "Competencies", icon: BarChart3 },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <div className={cn("relative h-screen border-r bg-background transition-all duration-300", open ? "w-64" : "w-16")}>
      <div className="flex h-14 items-center justify-between border-b px-3">
        {open && <h2 className="text-lg font-semibold">SkillCenter</h2>}
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="ml-auto">
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </Button>
      </div>
      <nav className="flex flex-col gap-2 p-3">
        {navItems.map((item) => (
          <Button
            key={item.id}
            variant={currentPage === item.id ? "default" : "ghost"}
            className={cn("justify-start", !open && "justify-center px-2")}
            onClick={() => onNavigate(item.id)}
          >
            <item.icon className={cn("h-5 w-5", open && "mr-2")} />
            {open && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>
    </div>
  )
}

