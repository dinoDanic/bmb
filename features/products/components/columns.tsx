"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"
import type { ProductWithCategory } from "../api/actions"

export function createColumns(): ColumnDef<ProductWithCategory>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <HugeiconsIcon
            icon={column.getIsSorted() === "asc" ? ArrowUp01Icon : ArrowDown01Icon}
            size={14}
          />
        </Button>
      ),
    },
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `${row.original.price.toFixed(2)}`,
    },
    {
      accessorKey: "categoryName",
      header: "Category",
      cell: ({ row }) => row.original.categoryName ?? "-",
      filterFn: (row, id, value: string[]) =>
        value.includes(row.getValue(id) as string),
    },
    {
      accessorKey: "featured",
      header: "Featured",
      cell: ({ row }) => (row.original.featured ? "\u2713" : "\u2014"),
      filterFn: (row, id, value: boolean) => row.getValue(id) === value,
    },
    {
      accessorKey: "active",
      header: "Active",
      cell: ({ row }) => (row.original.active ? "\u2713" : "\u2014"),
      filterFn: (row, id, value: boolean) => row.getValue(id) === value,
    },
  ]
}
