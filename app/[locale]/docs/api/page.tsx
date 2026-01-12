import Link from "next/link"
import { ArrowLeft, Code, Key, Shield, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion"

const sectionIcons = {
  authentication: Key,
  endpoints: Code,
  rateLimit: Shield,
  errors: AlertCircle,
}

interface ApiPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: ApiPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return {
    title: dictionary.docsPages.api.title,
    description: dictionary.docsPages.api.description,
  }
}

export default async function ApiPage({ params }: ApiPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const { api } = dictionary.docsPages

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <FadeIn>
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/${locale}/docs`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {dictionary.docs.backHome}
              </Link>
            </Button>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Code className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">{api.title}</h1>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">{api.description}</p>
          </div>
        </FadeIn>

        <FadeIn className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">{api.sections.intro}</p>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeInStagger className="space-y-6">
          <FadeInStaggerItem>
            <Card className="transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <Key className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{api.sections.authentication.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{api.sections.authentication.content}</p>
                <div className="mt-4 rounded-lg bg-muted p-4">
                  <code className="font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </code>
                </div>
              </CardContent>
            </Card>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <Card className="transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <Code className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{api.sections.endpoints.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {api.sections.endpoints.items.map((item, index) => (
                    <li key={index} className="rounded-lg bg-muted p-3">
                      <code className="font-mono text-sm">{item}</code>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <Card className="transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <Shield className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{api.sections.rateLimit.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{api.sections.rateLimit.content}</p>
              </CardContent>
            </Card>
          </FadeInStaggerItem>

          <FadeInStaggerItem>
            <Card className="transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <AlertCircle className="h-4 w-4 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{api.sections.errors.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{api.sections.errors.content}</p>
              </CardContent>
            </Card>
          </FadeInStaggerItem>
        </FadeInStagger>
      </div>
    </div>
  )
}
