import type { ReactNode } from "react"
import { LandingHeader } from "@/feature/landing/sections/landing-header"

export default function LandingLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-screen bg-background text-foreground bg-linear-to-b from-background via-background to-muted/40">
      <LandingHeader />
      {children}
    </div>
  )
}
