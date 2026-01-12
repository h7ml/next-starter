import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, Search, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Locale } from "@/lib/i18n/config"

interface PostsPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function PostsPage({ params }: PostsPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const posts = [
    { id: 1, title: "Getting Started with Next.js 16", status: "published", views: 1234, date: "2024-01-10" },
    { id: 2, title: "Building Modern UIs with shadcn/ui", status: "published", views: 856, date: "2024-01-08" },
    { id: 3, title: "Database Design with Prisma", status: "draft", views: 0, date: "2024-01-05" },
    { id: 4, title: "Authentication Best Practices", status: "draft", views: 0, date: "2024-01-03" },
    { id: 5, title: "Deploying to Vercel", status: "published", views: 542, date: "2024-01-01" },
    { id: 6, title: "Docker for Development", status: "published", views: 321, date: "2023-12-28" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{locale === "zh" ? "我的文章" : "My Posts"}</h1>
          <p className="mt-1 text-muted-foreground">{locale === "zh" ? "管理你的所有文章" : "Manage all your posts"}</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          {locale === "zh" ? "新建文章" : "New Post"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder={locale === "zh" ? "搜索文章..." : "Search posts..."} className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium">{locale === "zh" ? "标题" : "Title"}</th>
                  <th className="pb-3 font-medium">{locale === "zh" ? "状态" : "Status"}</th>
                  <th className="pb-3 font-medium">{locale === "zh" ? "浏览" : "Views"}</th>
                  <th className="pb-3 font-medium">{locale === "zh" ? "日期" : "Date"}</th>
                  <th className="pb-3 font-medium">{locale === "zh" ? "操作" : "Actions"}</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-border last:border-0">
                    <td className="py-4">
                      <p className="font-medium">{post.title}</p>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          post.status === "published"
                            ? "bg-primary/10 text-primary"
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}
                      >
                        {post.status === "published"
                          ? locale === "zh"
                            ? "已发布"
                            : "Published"
                          : locale === "zh"
                            ? "草稿"
                            : "Draft"}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">{post.views.toLocaleString()}</td>
                    <td className="py-4 text-muted-foreground">{post.date}</td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            {locale === "zh" ? "查看" : "View"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {locale === "zh" ? "编辑" : "Edit"}
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {locale === "zh" ? "删除" : "Delete"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
