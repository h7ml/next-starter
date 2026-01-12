import { Suspense } from "react"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Shield, Ban, Edit, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { SearchInput } from "@/components/admin/search-input"
import type { Locale } from "@/lib/i18n/config"

interface UsersPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function UsersPage({ params }: UsersPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "USER", status: "active", createdAt: "2024-01-10" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "ADMIN", status: "active", createdAt: "2024-01-08" },
    { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "USER", status: "active", createdAt: "2024-01-05" },
    { id: 4, name: "Alice Brown", email: "alice@example.com", role: "USER", status: "banned", createdAt: "2024-01-03" },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "USER",
      status: "active",
      createdAt: "2024-01-01",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dict.admin.userManagement}</h1>
        <p className="mt-1 text-muted-foreground">
          {locale === "zh" ? "管理所有用户账号" : "Manage all user accounts"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Suspense fallback={null}>
              <SearchInput placeholder={dict.admin.search} />
            </Suspense>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-3 font-medium">{locale === "zh" ? "用户" : "User"}</th>
                  <th className="pb-3 font-medium">{dict.admin.role}</th>
                  <th className="pb-3 font-medium">{dict.admin.status}</th>
                  <th className="pb-3 font-medium">{dict.admin.createdAt}</th>
                  <th className="pb-3 font-medium">{dict.admin.actions}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-border last:border-0">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-medium text-primary">
                          {user.name[0]}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          user.role === "ADMIN"
                            ? "bg-destructive/10 text-destructive"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          user.status === "active" ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {user.status === "active"
                          ? locale === "zh"
                            ? "正常"
                            : "Active"
                          : locale === "zh"
                            ? "已禁用"
                            : "Banned"}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">{user.createdAt}</td>
                    <td className="py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            {dict.admin.edit}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            {locale === "zh" ? "设为管理员" : "Make Admin"}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Ban className="mr-2 h-4 w-4" />
                            {dict.admin.ban}
                          </DropdownMenuItem>
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
