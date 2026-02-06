"use client"

import { Sidebar } from "@/components/ui/sidebar"
import { SidebarNavigation } from "./sidebar-navigation"

export function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarNavigation />
    </Sidebar>
  )
}
