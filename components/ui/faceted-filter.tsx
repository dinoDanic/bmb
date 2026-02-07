"use client"

import { useState } from "react"
import { Popover } from "@base-ui/react/popover"
import { HugeiconsIcon } from "@hugeicons/react"
import { Add01Icon, Tick02Icon, Cancel01Icon } from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import type { FormOption } from "@/components/form/types"

type FacetedFilterProps = {
  title: string
  options: FormOption[]
  selected: string[]
  onSelectionChange: (values: string[]) => void
  counts?: Map<string, number>
}

export function FacetedFilter({
  title,
  options,
  selected,
  onSelectionChange,
  counts,
}: FacetedFilterProps) {
  const [search, setSearch] = useState("")

  const filteredOptions: FormOption[] = search
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(search.toLowerCase())
      )
    : options

  function toggleValue(value: string) {
    const next: string[] = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value]
    onSelectionChange(next)
  }

  return (
    <Popover.Root>
      <Popover.Trigger
        render={
          <Button variant="outline" size="sm" className="border-dashed">
            <HugeiconsIcon icon={Add01Icon} size={14} data-icon="inline-start" />
            {title}
            {selected.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-0.5 h-4" />
                <Badge variant="secondary" className="lg:hidden">
                  {selected.length}
                </Badge>
                <div className="hidden gap-1 lg:flex">
                  {selected.length > 2 ? (
                    <Badge variant="secondary">
                      {selected.length} selected
                    </Badge>
                  ) : (
                    options
                      .filter((opt) => selected.includes(String(opt.value)))
                      .map((opt) => (
                        <Badge key={String(opt.value)} variant="secondary">
                          {opt.label}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        }
      />
      <Popover.Portal>
        <Popover.Positioner
          align="start"
          side="bottom"
          sideOffset={4}
          className="isolate z-50 outline-none"
        >
          <Popover.Popup className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ring-foreground/5 bg-popover text-popover-foreground w-52 rounded-2xl p-1 shadow-2xl ring-1 duration-100 origin-(--transform-origin) overflow-hidden">
            <div className="px-2 pt-1 pb-1">
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-7 text-xs"
              />
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.map((option) => {
                const value = String(option.value)
                const isSelected = selected.includes(value)
                const count = counts?.get(value)

                return (
                  <div
                    key={value}
                    role="option"
                    aria-selected={isSelected}
                    className="focus:bg-accent focus:text-accent-foreground gap-2.5 rounded-xl px-3 py-2 text-sm relative flex cursor-default items-center outline-hidden select-none hover:bg-accent hover:text-accent-foreground"
                    onClick={() => toggleValue(value)}
                  >
                    <div
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <HugeiconsIcon icon={Tick02Icon} size={12} strokeWidth={2} />
                    </div>
                    <span className="flex-1 truncate">{option.label}</span>
                    {count !== undefined && (
                      <span className="text-muted-foreground ml-auto text-xs tabular-nums">
                        {count}
                      </span>
                    )}
                  </div>
                )
              })}
              {filteredOptions.length === 0 && (
                <div className="px-3 py-2 text-sm text-muted-foreground text-center">
                  No results.
                </div>
              )}
            </div>
            {selected.length > 0 && (
              <>
                <div className="bg-border/50 -mx-1 my-1 h-px" />
                <div
                  className="focus:bg-accent focus:text-accent-foreground gap-2.5 rounded-xl px-3 py-2 text-sm flex cursor-default items-center justify-center outline-hidden select-none hover:bg-accent hover:text-accent-foreground"
                  onClick={() => onSelectionChange([])}
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={14} />
                  Clear filters
                </div>
              </>
            )}
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}
