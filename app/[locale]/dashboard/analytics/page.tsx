import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Eye, Clock } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

interface AnalyticsPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function AnalyticsPage({ params }: AnalyticsPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const stats = [
    {
      title: locale === "zh" ? "总浏览量" : "Total Views",
      value: "12,453",
      change: "+12%",
      icon: Eye,
    },
    {
      title: locale === "zh" ? "独立访客" : "Unique Visitors",
      value: "3,234",
      change: "+8%",
      icon: Users,
    },
    {
      title: locale === "zh" ? "平均阅读时间" : "Avg. Read Time",
      value: "4m 32s",
      change: "+5%",
      icon: Clock,
    },
    {
      title: locale === "zh" ? "增长率" : "Growth Rate",
      value: "24%",
      change: "+3%",
      icon: TrendingUp,
    },
  ]

  const topPosts = [
    { title: "Getting Started with Next.js 16", views: 3421, growth: 15 },
    { title: "Building Modern UIs with shadcn/ui", views: 2856, growth: 12 },
    { title: "Database Design with Prisma", views: 1934, growth: 8 },
    { title: "Authentication Best Practices", views: 1567, growth: 22 },
    { title: "Deploying to Vercel", views: 1234, growth: -3 },
  ]

  const weeklyData = [
    { day: locale === "zh" ? "周一" : "Mon", views: 1200 },
    { day: locale === "zh" ? "周二" : "Tue", views: 1800 },
    { day: locale === "zh" ? "周三" : "Wed", views: 1400 },
    { day: locale === "zh" ? "周四" : "Thu", views: 2100 },
    { day: locale === "zh" ? "周五" : "Fri", views: 1900 },
    { day: locale === "zh" ? "周六" : "Sat", views: 800 },
    { day: locale === "zh" ? "周日" : "Sun", views: 600 },
  ]

  const maxViews = Math.max(...weeklyData.map((d) => d.views))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{locale === "zh" ? "数据分析" : "Analytics"}</h1>
        <p className="mt-1 text-muted-foreground">
          {locale === "zh" ? "查看你的内容表现" : "Track your content performance"}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="mt-1 text-2xl font-bold">{stat.value}</p>
                </div>
                <div className="rounded-full bg-primary/10 p-3">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              <p className="mt-2 text-sm text-primary">
                {stat.change} {locale === "zh" ? "较上周" : "vs last week"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{locale === "zh" ? "本周浏览趋势" : "Weekly Views Trend"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-end gap-2">
              {weeklyData.map((data) => (
                <div key={data.day} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t bg-primary transition-all hover:bg-primary/80"
                    style={{ height: `${(data.views / maxViews) * 200}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{locale === "zh" ? "热门文章" : "Top Posts"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPosts.map((post, index) => (
                <div key={post.title} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-1">{post.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {post.views.toLocaleString()} {locale === "zh" ? "次浏览" : "views"}
                    </p>
                  </div>
                  <span className={`text-sm font-medium ${post.growth >= 0 ? "text-primary" : "text-destructive"}`}>
                    {post.growth >= 0 ? "+" : ""}
                    {post.growth}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
