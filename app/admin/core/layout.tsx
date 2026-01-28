import { redirect } from "next/navigation"
import { verifySession } from "@/lib/auth"
import { AdminSidebar } from "@/features-admin/shared/components/admin-sidebar"
import { AdminHeader } from "@/features-admin/shared/components/admin-header"
import { QueryProvider } from "@/lib/tanstack/provider"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await verifySession()
  console.log("session:", session);


  return (
    <QueryProvider>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <div className="flex flex-1 flex-col">
          {session && (
            <AdminHeader email={session.email} />
          )}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </QueryProvider>
  )
}
