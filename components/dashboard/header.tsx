"use client"

import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LocaleSwitcher } from "@/components/ui/locale-switcher"
import { DashboardCommandMenu } from "@/components/dashboard/dashboard-command-menu"
import type { Dictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"

interface DashboardHeaderProps {
  locale: Locale
  dict: Dictionary
  user: { id: string; name?: string | null; email: string; avatar?: string | null }
  onMenuClick?: () => void
}

export function DashboardHeader({ locale, dict, user, onMenuClick }: DashboardHeaderProps) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase()

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-lg md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        <DashboardCommandMenu locale={locale} />
      </div>

      <div className="flex items-center gap-3">
        <LocaleSwitcher currentLocale={locale} />
        <ThemeToggle dict={dict} />
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary" />
        </Button>
        <div className="flex items-center gap-3 border-l border-border pl-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.avatar || undefined} alt={user.name || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col md:flex">
            <span className="text-sm font-medium">{user.name || "User"}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
