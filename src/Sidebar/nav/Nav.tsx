import { AppSidebar } from './Sidebar';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function Nav({ children }: { children: React.ReactNode }) {
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  const navigate = useNavigate();
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />
        <SidebarInset className="flex w-full flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-6">
            <SidebarTrigger />
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
                  <Button variant="outline" size="icon" className="relative" onClick={() => navigate("/Notifications")}>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Utilisateur" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Profil</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Déconnexion</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex h-full w-full overflow-auto p-6 bg-gradient-to-br from-gray-100 to-gray-200">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
