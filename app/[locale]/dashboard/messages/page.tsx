import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { MessagesTable } from "@/components/dashboard/messages-table"

interface MessagesPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function MessagesPage({ params }: MessagesPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dict.dashboard.messages}</h1>
        <p className="mt-1 text-muted-foreground">{dict.dashboard.inbox}</p>
      </div>
      <MessagesTable locale={locale} dict={dict} />
    </div>
  )
}
