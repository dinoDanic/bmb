import { Href } from "@/types"
import {
  DashboardSquare02Icon,
  Package01Icon,
  Tag01Icon,
  ShoppingCart01Icon,
  Settings01Icon,
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
    url: "#",
    icon: Package01Icon,
  },
  {
    title: "Categories",
    url: "#",
    icon: Tag01Icon,
  },
  {
    title: "Orders",
    url: "#",
    icon: ShoppingCart01Icon,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings01Icon,
  },
]
