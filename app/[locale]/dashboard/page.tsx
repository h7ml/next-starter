import { PenLine } from "lucide-react"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { getCurrentUser } from "@/lib/auth/session"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Locale } from "@/lib/i18n/config"

interface DashboardPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const user = await getCurrentUser()

  const stats = [
    { title: dict.dashboard.stats.totalPosts, value: 12, icon: "fileText", trend: { value: 12, isPositive: true } },
    { title: dict.dashboard.stats.published, value: 8, icon: "bookOpen", trend: { value: 5, isPositive: true } },
    { title: dict.dashboard.stats.drafts, value: 4, icon: "penLine" },
    { title: dict.dashboard.stats.views, value: "2.4K", icon: "eye", trend: { value: 18, isPositive: true } },
  ]

  const recentPosts = [
    { id: 1, title: "Getting Started with Next.js 16", status: "published", date: "2024-01-10" },
    { id: 2, title: "Building Modern UIs with shadcn/ui", status: "published", date: "2024-01-08" },
    { id: 3, title: "Database Design with Prisma", status: "draft", date: "2024-01-05" },
    { id: 4, title: "Authentication Best Practices", status: "draft", date: "2024-01-03" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{dict.dashboard.title}</h1>
        <p className="mt-1 text-muted-foreground">
          {dict.dashboard.welcome}, {user?.name || user?.email}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatsCard key={stat.title} {...stat} index={index} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{dict.dashboard.recentPosts}</CardTitle>
            <Button variant="outline" size="sm">
              {dict.dashboard.viewAll}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                      post.status === "published"
                        ? "bg-green-500/10 text-green-500"
                        : "bg-yellow-500/10 text-yellow-500"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.createPost}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-primary/10 p-4">
              <PenLine className="h-8 w-8 text-primary" />
            </div>
            <p className="mt-4 text-center text-muted-foreground">Start writing your next blog post</p>
            <Button className="mt-4">
              <PenLine className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
