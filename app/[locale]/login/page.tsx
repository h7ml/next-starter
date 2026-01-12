import { getDictionary } from "@/lib/i18n/get-dictionary"
import { LoginForm } from "@/components/auth/login-form"
import { getEnabledOAuthProviders } from "@/lib/features"
import { AuthLayout } from "@/components/layout/auth-layout"
import type { Locale } from "@/lib/i18n/config"

interface LoginPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const oauthProviders = getEnabledOAuthProviders()

  return (
    <AuthLayout locale={locale} dict={dict}>
      <LoginForm locale={locale} dict={dict} oauthProviders={oauthProviders} />
    </AuthLayout>
  )
}
