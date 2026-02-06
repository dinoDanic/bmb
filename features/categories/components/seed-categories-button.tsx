"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { seedCategories } from "../api/actions"

export function SeedCategoriesButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSeed() {
    setLoading(true)
    try {
      const count = await seedCategories()
      if (count > 0) {
        router.refresh()
      }
    } catch {
      alert("Failed to seed categories")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <p className="text-muted-foreground text-sm">No categories found.</p>
      <Button onClick={handleSeed} disabled={loading} variant="outline">
        {loading ? "Seeding..." : "Seed Categories"}
      </Button>
    </div>
  )
}
