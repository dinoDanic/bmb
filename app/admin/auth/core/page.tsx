import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

export default function DashboardPage() {
  return (
    <SidebarInset>
      <header className="">
        <SidebarTrigger />
      </header>
    </SidebarInset>
  )
}
