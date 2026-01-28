"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/features-admin/shared/components/data-table"
import { useDeleteProduct } from "../hooks"
import type { Product, Category } from "@/db/types"

type Props = {
  products: Product[]
  categories: Category[]
}

export function ProductsTable({ products, categories }: Props) {
  const router = useRouter()
  const deleteMutation = useDeleteProduct()

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this product?")) return

    await deleteMutation.mutateAsync(id)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new">
          <Button>Add Product</Button>
        </Link>
      </div>

      <DataTable
        data={products}
        columns={[
          { key: "id", header: "ID" },
          { key: "name", header: "Name" },
          { key: "code", header: "Code" },
          {
            key: "price",
            header: "Price",
            render: (item) => `$${item.price.toFixed(2)}`,
          },
          {
            key: "categoryId",
            header: "Category",
            render: (item) => {
              const category = categories.find((c) => c.id === item.categoryId)
              return category?.name || "-"
            },
          },
          {
            key: "featured",
            header: "Featured",
            render: (item) => (item.featured ? "Yes" : "No"),
          },
          {
            key: "active",
            header: "Active",
            render: (item) => (item.active ? "Yes" : "No"),
          },
        ]}
        editPath={(id) => `/admin/products/${id}/edit`}
        onDelete={handleDelete}
      />
    </div>
  )
}
