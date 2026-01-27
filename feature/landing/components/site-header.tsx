import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNav } from "./main-nav"
import { MobileNav } from "./mobile-nav"
import { COMPANY_NAME } from "../data/navigation-data"

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 pb-6 pt-8">
      <div className="flex items-center gap-6">
        <Link href="/" className="">
          {COMPANY_NAME}
        </Link>
        <MainNav />
      </div>
      <div className="flex items-center gap-2">
        <MobileNav />
        <Button size="sm" variant="outline" className="rounded-full">
          Kontakt
        </Button>
      </div>
    </header>
  )
}
