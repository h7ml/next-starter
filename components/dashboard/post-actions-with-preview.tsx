"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface Post {
  id: string
  title: string
  content: string
  status: string
  views: number
  createdAt: Date
}

interface PostActionsWithPreviewProps {
  post: Post
  locale: string
  dict: {
    view: string
    edit: string
    delete: string
    preview: string
    deleteConfirmTitle?: string
    deleteConfirmDesc?: string
    cancel?: string
    confirm?: string
  }
  onDelete?: () => void
}

export function PostActionsWithPreview({
  post,
  locale,
  dict,
  onDelete,
}: PostActionsWithPreviewProps) {
  const router = useRouter()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showPreviewDialog, setShowPreviewDialog] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const res = await fetch(`/api/dashboard/posts/${post.id}`, {
        method: "DELETE",
      })

      if (!res.ok) throw new Error("Failed to delete post")

      setShowDeleteDialog(false)
      if (onDelete) onDelete()
    } catch (error) {
      console.error("Delete error:", error)
      alert("删除失败，请重试")
    } finally {
      setDeleting(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setShowPreviewDialog(true)}>
            <Eye className="mr-2 h-4 w-4" />
            {dict.preview || dict.view}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`/${locale}/dashboard/posts/${post.id}`)}>
            <Edit className="mr-2 h-4 w-4" />
            {dict.edit}
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive" onClick={() => setShowDeleteDialog(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            {dict.delete}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showPreviewDialog} onOpenChange={setShowPreviewDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{post.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>状态: {post.status === "PUBLISHED" ? "已发布" : "草稿"}</span>
              <span>浏览: {post.views}</span>
              <span>创建: {new Date(post.createdAt).toLocaleDateString(locale)}</span>
            </div>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div className="whitespace-pre-wrap">{post.content}</div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{dict.deleteConfirmTitle || "确认删除"}</AlertDialogTitle>
            <AlertDialogDescription>
              {dict.deleteConfirmDesc || "此操作无法撤销。确定要删除这篇文章吗？"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{dict.cancel || "取消"}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? "删除中..." : dict.confirm || "确认"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
