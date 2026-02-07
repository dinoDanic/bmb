import { Href } from "@/types"
import {
  DashboardSquare02Icon,
  Package01Icon,
  Tag01Icon,
} from "@hugeicons/core-free-icons"
import type { IconSvgElement } from "@hugeicons/react"

type MenuItem = {
  title: string
  url: Href
  icon: IconSvgElement
}

export const menuItems: MenuItem[] = [
  {
    title: "Dashboard",
    url: "/admin/auth/core",
    icon: DashboardSquare02Icon,
  },
  {
    title: "Products",
    url: "/admin/auth/core/products",
    icon: Package01Icon,
  },
  {
    title: "Categories",
    url: "/admin/auth/core/categories",
    icon: Tag01Icon,
  },
]
