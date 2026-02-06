import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"

type AdminPageLayoutProps = {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
}

export function AdminPageLayout({ title, actions, children }: AdminPageLayoutProps) {
  return (
    <SidebarInset>
      <header className="flex items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <h1 className="text-lg font-medium">{title}</h1>
        </div>
        {actions}
      </header>
      <main className="px-6 pb-6">
        {children}
      </main>
    </SidebarInset>
  )
}
