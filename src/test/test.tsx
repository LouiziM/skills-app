import { useState } from "react"
import { SidebarProvider } from "./sidebar-provider"
import Sidebar from "./sidebar"
import Dashboard from "./dashboard"
import Evaluations from "./evaluations"
import Trainings from "./trainings"
import Competencies from "./competencies"
import Notifications from "../Notification/notifications"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Test() {
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [unreadNotifications, setUnreadNotifications] = useState(3)

  const renderPage = () => {
    switch (currentPage) {
      case "dashboard":
        return <Dashboard />
      case "evaluations":
        return <Evaluations />
      case "trainings":
        return <Trainings />
      case "competencies":
        return <Competencies />
      case "notifications":
        return <Notifications onNotificationsRead={() => setUnreadNotifications(0)} />
      default:
        return <Dashboard />
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex h-14 items-center gap-4 border-b bg-background px-4 lg:px-6">
            <div className="flex-1">
              <h1 className="text-xl font-semibold">Call Center Skill Management</h1>
            </div>
            <div className="flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="relative">
                    <Bell className="h-4 w-4" />
                    {unreadNotifications > 0 && (
                      <Badge
                        className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
                        variant="destructive"
                      >
                        {unreadNotifications}
                      </Badge>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setCurrentPage("notifications")}>
                    View all notifications
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex-1 overflow-auto p-4 lg:p-6">{renderPage()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}

