import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Eye, TrendingUp } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

interface AdminAnalyticsPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function AdminAnalyticsPage({ params }: AdminAnalyticsPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const monthlyData = [
    { month: locale === "zh" ? "1月" : "Jan", users: 120, posts: 45, views: 12000 },
    { month: locale === "zh" ? "2月" : "Feb", users: 150, posts: 52, views: 15000 },
    { month: locale === "zh" ? "3月" : "Mar", users: 180, posts: 61, views: 18500 },
    { month: locale === "zh" ? "4月" : "Apr", users: 220, posts: 78, views: 22000 },
    { month: locale === "zh" ? "5月" : "May", users: 280, posts: 89, views: 28000 },
    { month: locale === "zh" ? "6月" : "Jun", users: 350, posts: 102, views: 35000 },
  ]

  const maxUsers = Math.max(...monthlyData.map((d) => d.users))
  const maxPosts = Math.max(...monthlyData.map((d) => d.posts))
  const maxViews = Math.max(...monthlyData.map((d) => d.views))

  const topCountries = [
    { country: locale === "zh" ? "美国" : "United States", users: 450, percentage: 35 },
    { country: locale === "zh" ? "中国" : "China", users: 320, percentage: 25 },
    { country: locale === "zh" ? "日本" : "Japan", users: 180, percentage: 14 },
    { country: locale === "zh" ? "德国" : "Germany", users: 150, percentage: 12 },
    { country: locale === "zh" ? "其他" : "Others", users: 180, percentage: 14 },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dict.admin.analytics}</h1>
        <p className="mt-1 text-muted-foreground">
          {locale === "zh" ? "系统数据分析和统计" : "System data analytics and statistics"}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {locale === "zh" ? "用户增长" : "User Growth"}
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
              {locale === "zh" ? "文章发布" : "Posts Published"}
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
              {locale === "zh" ? "总浏览量" : "Total Views"}
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
            <CardTitle>{locale === "zh" ? "用户地区分布" : "User Distribution by Region"}</CardTitle>
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
                    <div className="h-full rounded-full bg-primary" style={{ width: `${country.percentage}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{locale === "zh" ? "增长概览" : "Growth Overview"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: locale === "zh" ? "月活用户" : "Monthly Active Users", value: "12,453", change: "+12%" },
                { label: locale === "zh" ? "日活用户" : "Daily Active Users", value: "3,234", change: "+8%" },
                { label: locale === "zh" ? "平均会话时长" : "Avg. Session Duration", value: "4m 32s", change: "+5%" },
                { label: locale === "zh" ? "跳出率" : "Bounce Rate", value: "32%", change: "-3%" },
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
