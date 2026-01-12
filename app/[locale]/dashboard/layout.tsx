import type React from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/session"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import type { Locale } from "@/lib/i18n/config"

interface DashboardLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { locale } = await params
  const user = await getCurrentUser()
  const dict = await getDictionary(locale)

  if (!user) {
    redirect(`/${locale}/login`)
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <DashboardSidebar locale={locale} dict={dict} user={user} />
      <div className="flex flex-1 flex-col">
        <DashboardHeader locale={locale} dict={dict} user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
