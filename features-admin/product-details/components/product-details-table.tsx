"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/features-admin/shared/components/data-table"
import { useDeleteProductDetail } from "../hooks"
import type { ProductDetails } from "@/db/types"

type Props = {
  productDetails: ProductDetails[]
}

export function ProductDetailsTable({ productDetails }: Props) {
  const router = useRouter()
  const deleteMutation = useDeleteProductDetail()

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this product details?")) return

    await deleteMutation.mutateAsync(id)
    router.refresh()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <Link href="/admin/product-details/new">
          <Button>Add Product Details</Button>
        </Link>
      </div>

      <DataTable
        data={productDetails}
        columns={[
          { key: "id", header: "ID" },
          {
            key: "width",
            header: "Width",
            render: (item) => (item.width ? `${item.width} cm` : "-"),
          },
          {
            key: "height",
            header: "Height",
            render: (item) => (item.height ? `${item.height} cm` : "-"),
          },
          {
            key: "depth",
            header: "Depth",
            render: (item) => (item.depth ? `${item.depth} cm` : "-"),
          },
          {
            key: "weight",
            header: "Weight",
            render: (item) => (item.weight ? `${item.weight} kg` : "-"),
          },
        ]}
        editPath={(id) => `/admin/product-details/${id}/edit`}
        onDelete={handleDelete}
      />
    </div>
  )
}
