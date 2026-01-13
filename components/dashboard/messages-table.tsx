"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DataTable, type Column } from "@/components/ui/data-table"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MessageItem {
  id: string
  title: string
  createdAt: string
  readAt: string | null
}

interface MessagesTableProps {
  locale: string
  dict: {
    dashboard: {
      messages: string
      inbox: string
      noMessages: string
      read: string
      unread: string
      open: string
      date: string
      status: string
      messageTitle: string
      actions: string
      loading: string
      perPage: string
      pageSummary: string
    }
  }
}

export function MessagesTable({ locale, dict }: MessagesTableProps) {
  const router = useRouter()
  const [messages, setMessages] = useState<MessageItem[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [loading, setLoading] = useState(true)

  const fetchMessages = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/dashboard/messages?page=${page}&pageSize=${pageSize}`)
      if (!res.ok) throw new Error("Failed to fetch messages")
      const data = await res.json()
      setMessages(data.messages || [])
      setTotal(data.total || 0)
    } catch (error) {
      console.error("Messages fetch error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
  }, [page, pageSize])

  const columns: Array<Column<MessageItem>> = [
    {
      key: "title",
      label: dict.dashboard.messageTitle,
      render: (item) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium line-clamp-2">{item.title}</span>
        </div>
      ),
    },
    {
      key: "status",
      label: dict.dashboard.status,
      width: "16%",
      render: (item) => (
        <span
          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
            item.readAt ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
          }`}
        >
          {item.readAt ? dict.dashboard.read : dict.dashboard.unread}
        </span>
      ),
    },
    {
      key: "createdAt",
      label: dict.dashboard.date,
      width: "18%",
      render: (item) => (
        <span className="text-muted-foreground">
          {new Date(item.createdAt).toLocaleDateString(locale)}
        </span>
      ),
    },
    {
      key: "actions",
      label: dict.dashboard.actions,
      width: "16%",
      render: (item) => (
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => router.push(`/${locale}/dashboard/messages/${item.id}`)}
        >
          {dict.dashboard.open}
        </Button>
      ),
    },
  ]

  const formatSummary = (summary: { total: number; page: number; totalPages: number }) =>
    dict.dashboard.pageSummary
      .replace("{total}", summary.total.toString())
      .replace("{page}", summary.page.toString())
      .replace("{totalPages}", summary.totalPages.toString())

  return (
    <DataTable
      columns={columns}
      data={messages}
      total={total}
      page={page}
      pageSize={pageSize}
      onPageChange={setPage}
      onPageSizeChange={(size) => {
        setPageSize(size)
        setPage(1)
      }}
      loading={loading}
      emptyMessage={dict.dashboard.noMessages}
      loadingText={dict.dashboard.loading}
      perPageText={dict.dashboard.perPage}
      summaryFormatter={formatSummary}
      enableVirtualScroll={false}
      rowHeight={60}
      mobileCardRender={(item) => (
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium line-clamp-2">{item.title}</span>
              <span
                className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  item.readAt ? "bg-muted text-muted-foreground" : "bg-primary/10 text-primary"
                }`}
              >
                {item.readAt ? dict.dashboard.read : dict.dashboard.unread}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{new Date(item.createdAt).toLocaleDateString(locale)}</span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => router.push(`/${locale}/dashboard/messages/${item.id}`)}
              >
                {dict.dashboard.open}
              </Button>
            </div>
          </div>
        </Card>
      )}
    />
  )
}
