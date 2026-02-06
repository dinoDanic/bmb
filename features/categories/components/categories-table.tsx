"use client"

import { createColumns } from "./columns"
import { DataTable } from "./data-table"
import type { CategoryWithParent } from "../api/actions"
import type { Category } from "@/db/types"

type CategoriesTableProps = {
  categories: CategoryWithParent[]
  parentCategories: Category[]
}

export function CategoriesTable({ categories, parentCategories }: CategoriesTableProps) {
  const columns = createColumns(parentCategories)

  return <DataTable columns={columns} data={categories} />
}
