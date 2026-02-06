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
import { seedDatabase } from "../actions/seed-database"

export function SeedButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSeed() {
    setLoading(true)
    try {
      const stats = await seedDatabase()
      alert(
        `Database seeded successfully!\n\n` +
          `Parent Categories: ${stats.parentCategories}\n` +
          `Sub-Categories: ${stats.subCategories}\n` +
          `Products: ${stats.products}\n` +
          `Product Details: ${stats.productDetails}`
      )
      router.refresh()
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
