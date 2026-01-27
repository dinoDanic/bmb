import type { BadgeProps } from "@/components/ui/badge"

export type Category = {
  name: string
  description: string
  image: string
  count: number
}

export type Product = {
  name: string
  price: string
  image: string
  badge?: BadgeProps
}

export type HeroStat = {
  label: string
  value: string
}

export type NavSubItem = {
  label: string
  href: string
  description?: string
}

export type NavItem = {
  label: string
  href?: string
  subcategories?: NavSubItem[]
}
