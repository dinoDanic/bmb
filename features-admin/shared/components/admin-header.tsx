"use client"

import { Button } from "@/components/ui/button"
import { logout } from "@/features-admin/auth/actions/logout"

type AdminHeaderProps = {
  email: string
}

export function AdminHeader({ email }: AdminHeaderProps) {
  async function handleLogout() {
    await logout()
  }

  return (
    <header className="h-16 border-b border-border bg-card px-6 flex items-center justify-between">
      <div />
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">{email}</span>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  )
}
