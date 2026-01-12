import { Suspense } from "react"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Shield, Ban, Edit, Trash2 } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SearchInput } from "@/components/admin/search-input"
import { defaultLocale, locales, type Locale } from "@/lib/i18n/config"
import { headers } from "next/headers"

interface UsersPageProps {
  params: Promise<{ locale: string }>
}

export default async function UsersPage({ params }: UsersPageProps) {
  const { locale } = await params
  const currentLocale = locales.includes(locale as Locale) ? (locale as Locale) : defaultLocale
  const dict = await getDictionary(currentLocale)

  const headersList = await headers()
  const protocol = headersList.get("x-forwarded-proto") || "http"
  const host = headersList.get("host") || "localhost:3000"
  const baseUrl = `${protocol}://${host}`

  let users: Array<{
    id: string
    name: string | null
    email: string
    role: string
    status: string
    createdAt: Date
  }> = []

  try {
    const res = await fetch(`${baseUrl}/api/admin/users?limit=20`, {
      cache: "no-store",
    })
    if (res.ok) {
      const data = await res.json()
      users = data.users || []
    }
  } catch (error) {
    console.error("Failed to fetch users:", error)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dict.admin.userManagement}</h1>
        <p className="mt-1 text-muted-foreground">{dict.admin.userManagementDesc}</p>
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
                  <th className="pb-3 font-medium">{dict.admin.user}</th>
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
                          {(user.name ?? user.email)[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{user.name || user.email.split("@")[0]}</p>
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
                          user.status === "ACTIVE"
                            ? "bg-primary/10 text-primary"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {user.status === "ACTIVE" ? dict.admin.active : dict.admin.banned}
                      </span>
                    </td>
                    <td className="py-4 text-muted-foreground">
                      {new Date(user.createdAt).toLocaleDateString(currentLocale)}
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
                            <Edit className="mr-2 h-4 w-4" />
                            {dict.admin.edit}
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            {dict.admin.makeAdmin}
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
