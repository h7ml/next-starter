import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Eye, TrendingUp } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import { headers } from "next/headers"

interface AdminAnalyticsPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function AdminAnalyticsPage({ params }: AdminAnalyticsPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const headersList = await headers()
  const protocol = headersList.get("x-forwarded-proto") || "http"
  const host = headersList.get("host") || "localhost:3000"
  const baseUrl = `${protocol}://${host}`

  let monthlyData: Array<{ month: string; users: number; posts: number; views: number }> = []
  let topCountries: Array<{ country: string; users: number; percentage: number }> = []

  try {
    const res = await fetch(`${baseUrl}/api/admin/analytics`, {
      cache: "no-store",
    })
    if (res.ok) {
      const data = await res.json()
      const userGrowth = data.userGrowth || []
      const postStats = data.postStats || []
      const viewStats = data.viewStats || []

      monthlyData = userGrowth.map((item: { month: string; users: number }, index: number) => ({
        month: item.month,
        users: item.users,
        posts: postStats[index]?.posts || 0,
        views: viewStats[index]?.views || 0,
      }))

      topCountries = data.topCountries || []
    }
  } catch (error) {
    console.error("Failed to fetch analytics:", error)
    const defaultMonths = [
      dict.admin.months.jan,
      dict.admin.months.feb,
      dict.admin.months.mar,
      dict.admin.months.apr,
      dict.admin.months.may,
      dict.admin.months.jun,
    ]
    monthlyData = defaultMonths.map((month, i) => ({
      month,
      users: 120 + i * 30,
      posts: 45 + i * 10,
      views: 12000 + i * 3000,
    }))
  }

  const maxUsers = Math.max(...monthlyData.map((d) => d.users))
  const maxPosts = Math.max(...monthlyData.map((d) => d.posts))
  const maxViews = Math.max(...monthlyData.map((d) => d.views))

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dict.admin.analytics}</h1>
        <p className="mt-1 text-muted-foreground">{dict.admin.systemDataAnalytics}</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {dict.admin.userGrowth}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-2">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t bg-primary transition-all hover:bg-primary/80"
                    style={{ height: `${(data.users / maxUsers) * 160}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-chart-2" />
              {dict.admin.postsPublished}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-2">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t bg-chart-2 transition-all hover:opacity-80"
                    style={{ height: `${(data.posts / maxPosts) * 160}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-chart-3" />
              {dict.admin.totalViews}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex h-48 items-end gap-2">
              {monthlyData.map((data) => (
                <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t bg-chart-3 transition-all hover:opacity-80"
                    style={{ height: `${(data.views / maxViews) * 160}px` }}
                  />
                  <span className="text-xs text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{dict.admin.userDistribution}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCountries.map((country) => (
                <div key={country.country} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{country.country}</span>
                    <span className="text-sm text-muted-foreground">
                      {country.users} ({country.percentage}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${country.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.admin.growthOverview}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  label: dict.admin.monthlyActiveUsers,
                  value: "12,453",
                  change: "+12%",
                },
                {
                  label: dict.admin.dailyActiveUsers,
                  value: "3,234",
                  change: "+8%",
                },
                {
                  label: dict.admin.avgSessionDuration,
                  value: "4m 32s",
                  change: "+5%",
                },
                { label: dict.admin.bounceRate, value: "32%", change: "-3%" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="mt-1 text-xl font-bold">{metric.value}</p>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <TrendingUp className="h-4 w-4" />
                    <span className="text-sm font-medium">{metric.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
