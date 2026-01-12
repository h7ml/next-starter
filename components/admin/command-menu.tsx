"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { FileText, Users, Settings, BarChart3, Search } from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"

interface CommandMenuProps {
  locale: Locale
}

export function CommandMenu({ locale }: CommandMenuProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dict, setDict] = useState<any>(null)

  useEffect(() => {
    getDictionary(locale).then(setDict)
  }, [locale])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  if (!dict) return null

  return (
    <>
      {/* Desktop: Full search bar */}
      <button
        onClick={() => setOpen(true)}
        className="relative hidden w-64 items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:flex"
      >
        <Search className="h-4 w-4" />
        <span>{dict.dashboard.searchPlaceholder}</span>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Mobile: Icon button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center justify-center rounded-lg border border-border bg-background p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground lg:hidden"
      >
        <Search className="h-5 w-5" />
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder={dict.admin.search} />
        <CommandList>
          <CommandEmpty>{dict.dashboard.noResults}</CommandEmpty>

          <CommandGroup heading={dict.dashboard.quickNav}>
            <CommandItem onSelect={() => runCommand(() => router.push(`/${locale}/admin`))}>
              <BarChart3 className="mr-2 h-4 w-4" />
              <span>{dict.dashboard.overview}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push(`/${locale}/admin/users`))}>
              <Users className="mr-2 h-4 w-4" />
              <span>{dict.admin.userManagement}</span>
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => router.push(`/${locale}/admin/posts`))}>
              <FileText className="mr-2 h-4 w-4" />
              <span>{dict.admin.postManagement}</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push(`/${locale}/admin/settings`))}
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>{dict.admin.settings}</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
