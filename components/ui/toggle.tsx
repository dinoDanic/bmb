"use client"

import type { VariantProps } from "class-variance-authority"
import { Button, buttonVariants } from "@/components/ui/button"

type ButtonVariant = NonNullable<VariantProps<typeof buttonVariants>["variant"]>

type ToggleProps = {
  label: string
  value: boolean | undefined
  onChange: (value: boolean | undefined) => void
}

const VARIANT_MAP: Record<string, ButtonVariant> = {
  true: "default",
  false: "destructive",
  undefined: "outline",
}

export function Toggle({ label, value, onChange }: ToggleProps) {
  function cycle() {
    if (value === undefined) onChange(true)
    else if (value === true) onChange(false)
    else onChange(undefined)
  }

  const variant: ButtonVariant = VARIANT_MAP[String(value)]

  return (
    <Button
      variant={variant}
      size="sm"
      className={value === undefined ? "border-dashed" : undefined}
      onClick={cycle}
    >
      {label}
      {value === true && " ✓"}
      {value === false && " ✗"}
    </Button>
  )
}
