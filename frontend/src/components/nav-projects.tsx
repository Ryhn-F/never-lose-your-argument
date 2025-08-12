"use client"

import {
  type LucideIcon,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavProjects({
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {/* Nav History */}
      <SidebarGroupLabel>History</SidebarGroupLabel>
      <SidebarMenu>
      </SidebarMenu>
    </SidebarGroup>
  )
}