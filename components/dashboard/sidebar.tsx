"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { LayoutDashboard, FileText, Settings, User, LogOut, ChevronLeft, ChevronRight, BarChart3 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Dictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"

interface DashboardSidebarProps {
  locale: Locale
  dict: Dictionary
  user: { id: string; name?: string | null; email: string; role: string }
}

export function DashboardSidebar({ locale, dict, user }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const navigation = [
    { name: dict.dashboard.overview, href: `/${locale}/dashboard`, icon: LayoutDashboard },
    { name: dict.admin.posts, href: `/${locale}/dashboard/posts`, icon: FileText },
    { name: dict.admin.analytics, href: `/${locale}/dashboard/analytics`, icon: BarChart3 },
    { name: dict.admin.settings, href: `/${locale}/dashboard/settings`, icon: Settings },
  ]

  const adminLink = user.role === "ADMIN" ? { name: dict.admin.title, href: `/${locale}/admin`, icon: User } : null

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      className="sticky top-0 flex h-screen flex-col border-r border-border bg-card"
    >
      <div className="flex h-16 items-center justify-between border-b border-border px-4">
        {!collapsed && (
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">NS</span>
            </div>
            <span className="text-lg font-semibold">Dashboard</span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-sm font-bold text-primary-foreground">NS</span>
          </div>
        )}
        <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </Link>
          )
        })}

        {adminLink && (
          <>
            <div className="my-4 border-t border-border" />
            <Link
              href={adminLink.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname.startsWith(adminLink.href)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary",
              )}
            >
              <adminLink.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{adminLink.name}</span>}
            </Link>
          </>
        )}
      </nav>

      <div className="border-t border-border p-4">
        <form action="/api/auth/logout" method="POST">
          <Button
            type="submit"
            variant="ghost"
            className={cn(
              "w-full justify-start gap-3 text-muted-foreground hover:text-destructive",
              collapsed && "justify-center",
            )}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </Button>
        </form>
      </div>
    </motion.aside>
  )
}
