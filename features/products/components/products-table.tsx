"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { createColumns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import type { DataTableFilters } from "@/components/ui/data-table-toolbar"
import type { ProductWithCategory } from "../api/actions"
import type { FormOption } from "@/components/form/types"

type ProductsTableProps = {
  products: ProductWithCategory[]
  categoryOptions: FormOption[]
}

const BOOLEAN_OPTIONS: FormOption[] = [
  { label: "Yes", value: "true" },
  { label: "No", value: "false" },
]

export function ProductsTable({ products, categoryOptions }: ProductsTableProps) {
  const router = useRouter()
  const columns = createColumns()

  const filters: DataTableFilters<ProductWithCategory> = useMemo(
    () => ({
      input: {
        columnKey: "name",
        placeholder: "Filter by name...",
      },
      faceted: [
        {
          columnKey: "categoryName",
          title: "Category",
          options: categoryOptions,
        },
        {
          columnKey: "featured",
          title: "Featured",
          options: BOOLEAN_OPTIONS,
        },
        {
          columnKey: "active",
          title: "Active",
          options: BOOLEAN_OPTIONS,
        },
      ],
    }),
    [categoryOptions]
  )

  return (
    <DataTable
      columns={columns}
      data={products}
      filters={filters}
      onRowClick={(product) => router.push(`/admin/auth/core/products/${product.id}`)}
    />
  )
}
