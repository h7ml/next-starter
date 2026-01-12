import Link from "next/link"
import { ArrowLeft, BookOpen, Lock, Database, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"
import { FadeIn, FadeInStagger, FadeInStaggerItem } from "@/components/ui/motion"

const sectionIcons = {
  basicSetup: BookOpen,
  authentication: Lock,
  database: Database,
  deployment: Rocket,
}

interface ExamplesPageProps {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: ExamplesPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)

  return {
    title: dictionary.docsPages.examples.title,
    description: dictionary.docsPages.examples.description,
  }
}

export default async function ExamplesPage({ params }: ExamplesPageProps) {
  const { locale } = await params
  const dictionary = await getDictionary(locale)
  const { examples } = dictionary.docsPages

  const sections = [
    { key: "basicSetup" as const, ...examples.sections.basicSetup },
    { key: "authentication" as const, ...examples.sections.authentication },
    { key: "database" as const, ...examples.sections.database },
    { key: "deployment" as const, ...examples.sections.deployment },
  ]

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
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-3xl font-bold">{examples.title}</h1>
            </div>
            <p className="mt-4 text-lg text-muted-foreground">{examples.description}</p>
          </div>
        </FadeIn>

        <FadeIn className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground">{examples.sections.intro}</p>
            </CardContent>
          </Card>
        </FadeIn>

        <FadeInStagger className="space-y-6">
          {sections.map((section) => {
            const Icon = sectionIcons[section.key]
            return (
              <FadeInStaggerItem key={section.key}>
                <Card className="transition-colors hover:border-primary/50">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{section.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-muted-foreground">{section.content}</p>
                    <div className="rounded-lg bg-muted p-4">
                      <pre className="overflow-x-auto">
                        <code className="font-mono text-sm">
{section.key === "basicSetup" && `// Install dependencies
npm install

// Run development server
npm run dev`}
{section.key === "authentication" && `import { signIn, signOut } from "@/lib/auth"

// Sign in
await signIn({ email, password })

// Sign out
await signOut()`}
{section.key === "database" && `import { prisma } from "@/lib/db"

// Query data
const users = await prisma.user.findMany()

// Create data
const user = await prisma.user.create({
  data: { email, name }
})`}
{section.key === "deployment" && `# Deploy to Vercel
vercel deploy

# Or use Docker
docker compose up -d`}
                        </code>
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </FadeInStaggerItem>
            )
          })}
        </FadeInStagger>
      </div>
    </div>
  )
}
