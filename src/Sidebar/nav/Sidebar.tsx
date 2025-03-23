import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, BarChart2, Users, Calendar, Settings, LogOut ,GraduationCap,LayoutDashboard,BarChart3,NotebookPen} from 'lucide-react';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import konectaLogo from "@/assets/konecta.png";

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

export function AppSidebar() {
  const location = useLocation();

  const sidebarItems: SidebarItem[] = [
    { title: 'Profil', icon: Users, href: "/Profile" },
    { title: 'Formations', icon: GraduationCap, href: "/Formations" },
    // { title: 'Evaluations', icon: NotebookPen, href: "/Evaluations" },
    { title: 'Compétences', icon: BarChart3, href: "/Skills" },
    // { title: 'Dashboard', icon: LayoutDashboard, href: "/Dashboard" },
    // { title: 'Test', icon: BarChart2, href: "/Test" },
  ];

  // Function to check if the current path matches the sidebar item
  const isActive = (href: string) => location.pathname === href;

  return (
    <Sidebar className={cn("border-r ")}>
      <SidebarHeader className="border-b p-4">
        <img
          src={konectaLogo}
          alt="Logo"
          className="mx-auto h-15 w-42 my-6"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {sidebarItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link to={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive(item.href)}
                  className={cn(
                    "w-full",
                    "text-gray-600 hover:bg-gray-200 hover:text-gray-900",
                    "data-[active=true]:bg-gray-900 data-[active=true]:text-white"
                  )}
                >
                  <a>
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.title}
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <Button
          variant="ghost"
          onClick={() => handleSignOut()}
          className={cn(
            "w-full justify-end text-gray-600 hover:bg-gray-200 hover:text-gray-900",
          )}
        >
          Logout
          <LogOut className="h-4 w-4 mr-2" />
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}

// Placeholder function for sign out
const handleSignOut = () => {
  // Implement sign out logic here
  console.log("User signed out");
};