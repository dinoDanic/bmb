"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/features-admin/shared/components/data-table"
import { useDeleteCategory } from "../hooks"
import type { Category } from "@/db/types"

type Props = {
  categories: Category[]
}

export function CategoriesTable({ categories }: Props) {
  const router = useRouter()
  const deleteMutation = useDeleteCategory()

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this category?")) return

    await deleteMutation.mutateAsync(id)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/admin/categories/new">
          <Button>Add Category</Button>
        </Link>
      </div>

      <DataTable
        data={categories}
        columns={[
          { key: "id", header: "ID" },
          { key: "name", header: "Name" },
          {
            key: "categoryId",
            header: "Parent",
            render: (item) => {
              const parent = categories.find((c) => c.id === item.categoryId)
              return parent?.name || "-"
            },
          },
          { key: "description", header: "Description" },
        ]}
        editPath={(id) => `/admin/categories/${id}/edit`}
        onDelete={handleDelete}
      />
    </div>
  )
}
