"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LocaleSwitcher } from "@/components/ui/locale-switcher"
import type { Dictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"

interface DashboardHeaderProps {
  locale: Locale
  dict: Dictionary
  user: { id: string; name?: string | null; email: string; avatar?: string | null }
}

export function DashboardHeader({ locale, dict, user }: DashboardHeaderProps) {
  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user.email[0].toUpperCase()

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-lg">
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={dict.admin.search || "Search..."} className="w-64 pl-9" />
        </div>
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
            <AvatarFallback className="bg-primary text-primary-foreground">{initials}</AvatarFallback>
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
