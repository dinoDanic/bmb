"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

type Column<T> = {
  key: keyof T | string
  header: string
  render?: (item: T) => React.ReactNode
}

type DataTableProps<T extends { id: number }> = {
  data: T[]
  columns: Column<T>[]
  editPath: (id: number) => string
  onDelete?: (id: number) => void
}

export function DataTable<T extends { id: number }>({
  data,
  columns,
  editPath,
  onDelete,
}: DataTableProps<T>) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              >
                {column.header}
              </th>
            ))}
            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-muted/50">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-3 text-sm">
                  {column.render
                    ? column.render(item)
                    : String(item[column.key as keyof T] ?? "")}
                </td>
              ))}
              <td className="px-4 py-3 text-right">
                <div className="flex items-center justify-end gap-2">
                  <Link href={editPath(item.id)}>
                    <Button variant="outline" size="sm">Edit</Button>
                  </Link>
                  {onDelete && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-8 text-center text-sm text-muted-foreground"
              >
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
