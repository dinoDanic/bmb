"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type NavItem = {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Products", href: "/admin/products" },
  { label: "Product Details", href: "/admin/product-details" },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-border bg-card min-h-screen">
      <div className="p-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="px-4">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block px-4 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
