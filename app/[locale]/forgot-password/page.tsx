import { getDictionary } from "@/lib/i18n/get-dictionary"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import type { Locale } from "@/lib/i18n/config"

interface ForgotPasswordPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function ForgotPasswordPage({ params }: ForgotPasswordPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 px-4">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <ForgotPasswordForm locale={locale} dict={dict} />
    </div>
  )
}
