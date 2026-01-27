"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { navigationItems } from "../data/navigation-data"

export function MainNav() {
  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {navigationItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.subcategories ? (
              <>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-100 gap-1 p-1">
                    {item.subcategories.map((subItem) => (
                      <li  key={subItem.href}>
                        <NavigationMenuLink
                          href={subItem.href}
                          className="flex flex-col gap-1  items-start"
                        >
                          <span className="text-sm font-medium">
                            {subItem.label}
                          </span>
                          {subItem.description && (
                            <span className="text-xs text-muted-foreground">
                              {subItem.description}
                            </span>
                          )}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href ?? "#"} className={navigationMenuTriggerStyle()}>
                {item.label}
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
