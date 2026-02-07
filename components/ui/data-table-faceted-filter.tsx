"use client"

import type { Column } from "@tanstack/react-table"
import { FacetedFilter } from "@/components/ui/faceted-filter"
import type { FormOption } from "@/components/form/types"

type DataTableFacetedFilterProps<TData, TValue> = {
  column: Column<TData, TValue>
  title: string
  options: FormOption[]
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const selected: string[] = (column.getFilterValue() as string[] | undefined) ?? []
  const facetedValues: Map<string, number> = column.getFacetedUniqueValues()

  return (
    <FacetedFilter
      title={title}
      options={options}
      selected={selected}
      onSelectionChange={(values) =>
        column.setFilterValue(values.length ? values : undefined)
      }
      counts={facetedValues}
    />
  )
}
