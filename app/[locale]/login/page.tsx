import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LoginForm } from "@/components/auth/login-form"
import { getEnabledOAuthProviders } from "@/lib/features"
import type { Locale } from "@/lib/i18n/config"

interface LoginPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const oauthProviders = getEnabledOAuthProviders()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 px-4">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      <LoginForm locale={locale} dict={dict} oauthProviders={oauthProviders} />
    </div>
  )
}
