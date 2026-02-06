import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/features/admin/components/app-sidebar"

export default async function CoreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()

  if (!session) {
    redirect("/admin/auth/login")
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      {children}
    </SidebarProvider>
  )
}
