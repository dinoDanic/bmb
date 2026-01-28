"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SeedButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSeed() {
    setLoading(true)
    try {
      const response = await fetch("/api/seed", { method: "POST" })
      const data = await response.json()

      if (response.ok) {
        alert(
          `Database seeded successfully!\n\n` +
            `Parent Categories: ${data.stats.parentCategories}\n` +
            `Sub-Categories: ${data.stats.subCategories}\n` +
            `Products: ${data.stats.products}\n` +
            `Product Details: ${data.stats.productDetails}`
        )
        router.refresh()
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch {
      alert("Failed to seed database")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button variant="outline" disabled={loading}>
            {loading ? "Seeding..." : "Seed Database"}
          </Button>
        }
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Seed Database</AlertDialogTitle>
          <AlertDialogDescription>
            This will delete all existing categories, products, and product details,
            then create new seed data. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSeed}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
