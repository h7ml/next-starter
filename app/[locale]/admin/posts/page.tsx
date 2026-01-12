import { Suspense } from "react"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SearchInput } from "@/components/admin/search-input"
import type { Locale } from "@/lib/i18n/config"

interface AdminPostsPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function AdminPostsPage({ params }: AdminPostsPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const posts = [
    {
      id: 1,
      title: "Getting Started with Next.js 16",
      author: "John Doe",
      status: "published",
      views: 1234,
      date: "2024-01-10",
    },
    {
      id: 2,
      title: "Building Modern UIs with shadcn/ui",
      author: "Jane Smith",
      status: "published",
      views: 856,
      date: "2024-01-08",
    },
    {
      id: 3,
      title: "Database Design with Prisma",
      author: "Bob Wilson",
      status: "pending",
      views: 0,
      date: "2024-01-05",
    },
    {
      id: 4,
      title: "Authentication Best Practices",
      author: "Alice Brown",
      status: "rejected",
      views: 0,
      date: "2024-01-03",
    },
    {
      id: 5,
      title: "Deploying to Vercel",
      author: "Charlie Davis",
      status: "published",
      views: 542,
      date: "2024-01-01",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-primary/10 text-primary"
      case "pending":
        return "bg-yellow-500/10 text-yellow-500"
      case "rejected":
        return "bg-destructive/10 text-destructive"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "published":
        return locale === "zh" ? "已发布" : "Published"
      case "pending":
        return locale === "zh" ? "待审核" : "Pending"
      case "rejected":
        return locale === "zh" ? "已拒绝" : "Rejected"
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{locale === "zh" ? "文章管理" : "Post Management"}</h1>
        <p className="mt-1 text-muted-foreground">
          {locale === "zh" ? "审核和管理所有文章" : "Review and manage all posts"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Suspense fallback={null}>
              <SearchInput placeholder={locale === "zh" ? "搜索文章..." : "Search posts..."} />
            </Suspense>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium">{locale === "zh" ? "标题" : "Title"}</th>
                  <th className="pb-3 font-medium">{locale === "zh" ? "作者" : "Author"}</th>
                  <th className="pb-3 font-medium">{dict.admin.status}</th>
                  <th className="pb-3 font-medium">{locale === "zh" ? "浏览" : "Views"}</th>
                  <th className="pb-3 font-medium">{locale === "zh" ? "日期" : "Date"}</th>
                  <th className="pb-3 font-medium">{dict.admin.actions}</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-border last:border-0">
                    <td className="py-4">
                      <p className="font-medium">{post.title}</p>
                    </td>
                    <td className="py-4 text-muted-foreground">{post.author}</td>
                    <td className="py-4">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(post.status)}`}>
                        {getStatusText(post.status)}
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
                            {dict.admin.edit}
                          </DropdownMenuItem>
                          {post.status === "pending" && (
                            <>
                              <DropdownMenuItem className="text-primary">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {locale === "zh" ? "批准" : "Approve"}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <XCircle className="mr-2 h-4 w-4" />
                                {locale === "zh" ? "拒绝" : "Reject"}
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            {dict.admin.delete}
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
