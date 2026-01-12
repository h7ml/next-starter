import type React from "react"
import { redirect } from "next/navigation"
import { getCurrentUser } from "@/lib/auth/session"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminHeader } from "@/components/admin/header"
import type { Locale } from "@/lib/i18n/config"

interface AdminLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: Locale }>
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params
  const user = await getCurrentUser()
  const dict = await getDictionary(locale)

  if (!user) {
    redirect(`/${locale}/login`)
  }

  if (user.role !== "ADMIN") {
    redirect(`/${locale}/error/403`)
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AdminSidebar locale={locale} dict={dict} />
      <div className="flex flex-1 flex-col">
        <AdminHeader locale={locale} dict={dict} user={user} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
