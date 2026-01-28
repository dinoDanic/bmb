import { Suspense } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { db } from "@/db"
import { categories, products, productDetails } from "@/db/schema"
import { SeedButton } from "@/features-admin/seed/components/seed-button"

async function DashboardStats() {
  const [categoryCount, productCount, detailsCount] = await Promise.all([
    db.select().from(categories).then((r) => r.length),
    db.select().from(products).then((r) => r.length),
    db.select().from(productDetails).then((r) => r.length),
  ])

  const stats = [
    { label: "Categories", count: categoryCount, href: "/admin/categories" },
    { label: "Products", count: productCount, href: "/admin/products" },
    { label: "Product Details", count: detailsCount, href: "/admin/product-details" },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <Link key={stat.href} href={stat.href}>
          <Card className="p-6 hover:bg-muted/50 transition-colors">
            <div className="text-sm text-muted-foreground">{stat.label}</div>
            <div className="text-3xl font-bold">{stat.count}</div>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <SeedButton />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <DashboardStats />
      </Suspense>
    </div>
  )
}
