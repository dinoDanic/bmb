"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { Sun02Icon, Moon02Icon, ComputerIcon } from "@hugeicons/core-free-icons"
import { SidebarMenuButton } from "@/components/ui/sidebar"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark")
    else if (theme === "dark") setTheme("system")
    else setTheme("light")
  }

  const getThemeLabel = () => {
    if (!mounted) return "Theme"
    if (theme === "light") return "Light"
    if (theme === "dark") return "Dark"
    return "System"
  }

  const getThemeIcon = () => {
    if (!mounted) return ComputerIcon
    if (theme === "light") return Sun02Icon
    if (theme === "dark") return Moon02Icon
    return ComputerIcon
  }

  return (
    <SidebarMenuButton onClick={cycleTheme}>
      <HugeiconsIcon icon={getThemeIcon()} strokeWidth={2} />
      <span>{getThemeLabel()}</span>
    </SidebarMenuButton>
  )
}
