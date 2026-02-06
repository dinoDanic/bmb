"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { PencilEdit02Icon, Delete02Icon, ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"
import { CategoryFormDialog } from "./category-form-dialog"
import { DeleteCategoryDialog } from "./delete-category-dialog"
import type { CategoryWithParent } from "../api/actions"
import type { Category } from "@/db/types"

export function createColumns(parentCategories: Category[]): ColumnDef<CategoryWithParent>[] {
  return [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "displayName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Display Name
          <HugeiconsIcon
            icon={column.getIsSorted() === "asc" ? ArrowUp01Icon : ArrowDown01Icon}
            size={14}
          />
        </Button>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "parentName",
      header: "Parent",
      cell: ({ row }) => row.original.parentName ?? "-",
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const category = row.original

        return (
          <div className="flex justify-end gap-1">
            <CategoryFormDialog
              category={category}
              parentCategories={parentCategories}
              trigger={
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon icon={PencilEdit02Icon} size={16} />
                </Button>
              }
            />
            <DeleteCategoryDialog
              category={category}
              trigger={
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon icon={Delete02Icon} size={16} />
                </Button>
              }
            />
          </div>
        )
      },
    },
  ]
}
