import { Suspense } from "react"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Trash2, CheckCircle, XCircle } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchInput } from "@/components/admin/search-input"
import type { Locale } from "@/lib/i18n/config"
import { headers } from "next/headers"

interface AdminPostsPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function AdminPostsPage({ params }: AdminPostsPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const headersList = await headers()
  const protocol = headersList.get("x-forwarded-proto") || "http"
  const host = headersList.get("host") || "localhost:3000"
  const baseUrl = `${protocol}://${host}`

  let posts: Array<{
    id: string
    title: string
    status: string
    views: number
    author: { name: string | null } | null
    createdAt: Date
  }> = []

  try {
    const res = await fetch(`${baseUrl}/api/admin/posts?limit=20`, {
      cache: "no-store",
    })
    if (res.ok) {
      const data = await res.json()
      posts = data.posts || []
    }
  } catch (error) {
    console.error("Failed to fetch posts:", error)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-primary/10 text-primary"
      case "PENDING":
        return "bg-yellow-500/10 text-yellow-500"
      case "REJECTED":
        return "bg-destructive/10 text-destructive"
      case "DRAFT":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return dict.admin.published
      case "PENDING":
        return dict.admin.pending
      case "REJECTED":
        return dict.admin.rejected
      case "DRAFT":
        return dict.admin.draft
      default:
        return status
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dict.admin.postManagement}</h1>
        <p className="mt-1 text-muted-foreground">{dict.admin.postManagementDesc}</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Suspense fallback={null}>
              <SearchInput placeholder={dict.admin.searchPosts} />
            </Suspense>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium">{dict.admin.postTitle}</th>
                  <th className="pb-3 font-medium">{dict.admin.author}</th>
                  <th className="pb-3 font-medium">{dict.admin.status}</th>
                  <th className="pb-3 font-medium">{dict.admin.views}</th>
                  <th className="pb-3 font-medium">{dict.admin.date}</th>
                  <th className="pb-3 font-medium">{dict.admin.actions}</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b border-border last:border-0">
                    <td className="py-4">
                      <p className="font-medium">{post.title}</p>
                    </td>
                    <td className="py-4 text-muted-foreground">{post.author?.name || "Unknown"}</td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(post.status)}`}
                      >
                        {getStatusText(post.status)}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">{post.views.toLocaleString()}</td>
                    <td className="py-4 text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString(locale)}
                    </td>
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
                            {dict.admin.view}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {dict.admin.edit}
                          </DropdownMenuItem>
                          {post.status === "PENDING" && (
                            <>
                              <DropdownMenuItem className="text-primary">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {dict.admin.approve}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive">
                                <XCircle className="mr-2 h-4 w-4" />
                                {dict.admin.reject}
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
