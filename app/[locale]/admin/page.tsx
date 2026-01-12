import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, TrendingUp, Activity } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"

interface AdminPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function AdminPage({ params }: AdminPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const stats = [
    {
      title: dict.admin.totalUsers,
      value: "1,234",
      change: "+12%",
      icon: Users,
    },
    {
      title: dict.admin.activeUsers,
      value: "892",
      change: "+8%",
      icon: Activity,
    },
    {
      title: dict.admin.newUsers,
      value: "156",
      change: "+23%",
      icon: TrendingUp,
    },
    {
      title: locale === "zh" ? "总文章数" : "Total Posts",
      value: "4,521",
      change: "+5%",
      icon: FileText,
    },
  ]

  const recentActivity = [
    {
      type: "user",
      message: locale === "zh" ? "新用户注册: john@example.com" : "New user registered: john@example.com",
      time: "2 min ago",
    },
    {
      type: "post",
      message: locale === "zh" ? "新文章发布: Getting Started" : "New post published: Getting Started",
      time: "15 min ago",
    },
    {
      type: "user",
      message: locale === "zh" ? "用户更新资料: jane@example.com" : "User updated profile: jane@example.com",
      time: "1 hour ago",
    },
    {
      type: "post",
      message: locale === "zh" ? "文章被删除: Old Tutorial" : "Post deleted: Old Tutorial",
      time: "2 hours ago",
    },
    {
      type: "user",
      message: locale === "zh" ? "用户被禁用: spam@example.com" : "User banned: spam@example.com",
      time: "3 hours ago",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{dict.admin.title}</h1>
        <p className="mt-1 text-muted-foreground">
          {locale === "zh" ? "系统概览和管理" : "System overview and management"}
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
                {stat.change} {locale === "zh" ? "较上月" : "vs last month"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{locale === "zh" ? "最近活动" : "Recent Activity"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 rounded-lg border border-border p-4">
                  <div
                    className={`rounded-full p-2 ${
                      activity.type === "user" ? "bg-primary/10 text-primary" : "bg-chart-2/10 text-chart-2"
                    }`}
                  >
                    {activity.type === "user" ? <Users className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{activity.message}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{locale === "zh" ? "系统状态" : "System Status"}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "API Server", status: "operational", uptime: "99.9%" },
                { name: "Database", status: "operational", uptime: "99.8%" },
                { name: "Storage", status: "operational", uptime: "100%" },
                { name: "CDN", status: "operational", uptime: "99.9%" },
              ].map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between rounded-lg border border-border p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="font-medium">{service.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary">
                      {service.status === "operational"
                        ? locale === "zh"
                          ? "运行中"
                          : "Operational"
                        : locale === "zh"
                          ? "异常"
                          : "Down"}
                    </p>
                    <p className="text-xs text-muted-foreground">{service.uptime} uptime</p>
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
