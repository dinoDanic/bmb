"use client"

import type { Column } from "@tanstack/react-table"
import { Toggle } from "@/components/ui/toggle"

type DataTableToggleFilterProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: string
}

export function DataTableToggleFilter<TData, TValue>({
  column,
  title,
}: DataTableToggleFilterProps<TData, TValue>) {
  const value = column.getFilterValue() as boolean | undefined

  return (
    <Toggle
      label={title}
      value={value}
      onChange={(v) => column.setFilterValue(v)}
    />
  )
}
