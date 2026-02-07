"use client"

import type { Table } from "@tanstack/react-table"
import { HugeiconsIcon } from "@hugeicons/react"
import { Cancel01Icon } from "@hugeicons/core-free-icons"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"
import { DataTableToggleFilter } from "@/components/ui/data-table-toggle-filter"
import type { FormOption } from "@/components/form/types"

export type DataTableFilters<TData> = {
  input?: {
    columnKey: keyof TData & string
    placeholder?: string
  }
  faceted?: Array<{
    columnKey: keyof TData & string
    title: string
    options: FormOption[]
  }>
  toggle?: Array<{
    columnKey: keyof TData & string
    title: string
  }>
}

type DataTableToolbarProps<TData> = {
  table: Table<TData>
  filters: DataTableFilters<TData>
}

export function DataTableToolbar<TData>({
  table,
  filters,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className="flex items-center gap-2">
      {filters.input && (
        <Input
          placeholder={filters.input.placeholder ?? "Filter..."}
          value={
            (table
              .getColumn(filters.input.columnKey)
              ?.getFilterValue() as string) ?? ""
          }
          onChange={(e) =>
            table
              .getColumn(filters.input!.columnKey)
              ?.setFilterValue(e.target.value)
          }
          className="max-w-sm"
        />
      )}
      {filters.faceted?.map((facet) => {
        const column = table.getColumn(facet.columnKey)
        if (!column) return null

        return (
          <DataTableFacetedFilter
            key={facet.columnKey}
            column={column}
            title={facet.title}
            options={facet.options}
          />
        )
      })}
      {filters.toggle?.map((toggle) => {
        const column = table.getColumn(toggle.columnKey)
        if (!column) return null

        return (
          <DataTableToggleFilter
            key={toggle.columnKey}
            column={column}
            title={toggle.title}
          />
        )
      })}
      {isFiltered && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.resetColumnFilters()}
        >
          Reset
          <HugeiconsIcon icon={Cancel01Icon} size={14} />
        </Button>
      )}
    </div>
  )
}
