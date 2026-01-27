"use client"

import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import { Menu01Icon } from "@hugeicons/core-free-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { navigationItems } from "../data/navigation-data"

export function MobileNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted focus:bg-muted outline-none md:hidden">
        <HugeiconsIcon icon={Menu01Icon} strokeWidth={2} className="size-5" />
        <span className="sr-only">Otvori meni</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        {navigationItems.map((item) =>
          item.subcategories ? (
            <DropdownMenuSub key={item.label}>
              <DropdownMenuSubTrigger>{item.label}</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {item.subcategories.map((subItem) => (
                  <DropdownMenuItem key={subItem.href}>
                    <Link href={subItem.href} className="flex-1">
                      {subItem.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          ) : (
            <DropdownMenuItem key={item.label}>
              <Link href={item.href ?? "#"} className="flex-1">
                {item.label}
              </Link>
            </DropdownMenuItem>
          )
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
