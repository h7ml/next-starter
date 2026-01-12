import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturesSection } from "@/components/sections/features-section"
import { TechStackSection } from "@/components/sections/tech-stack-section"
import { DeploySection } from "@/components/sections/deploy-section"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { getCurrentUser } from "@/lib/auth/session"
import { features } from "@/lib/features"
import type { Locale } from "@/lib/i18n/config"

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const user = await getCurrentUser()

  return (
    <div className="flex min-h-screen flex-col">
      <Header locale={locale} dict={dict} user={user} authEnabled={features.database} />
      <main className="flex-1">
        <HeroSection dict={dict} />
        <FeaturesSection dict={dict} />
        <TechStackSection dict={dict} />
        <DeploySection dict={dict} />
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  )
}
