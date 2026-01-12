"use client"

import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { LocaleSwitcher } from "@/components/ui/locale-switcher"
import type { Dictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"

interface AdminHeaderProps {
  locale: Locale
  dict: Dictionary
  user: { id: string; name?: string | null; email: string; role: string }
}

export function AdminHeader({ locale, dict, user }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={dict.admin.search} className="w-64 pl-10" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <LocaleSwitcher locale={locale} />
        <ThemeToggle />

        <div className="ml-2 flex items-center gap-3 rounded-lg border border-border px-3 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-sm font-medium text-destructive-foreground">
            {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium">{user.name || user.email.split("@")[0]}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
