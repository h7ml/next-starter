import { getDictionary } from "@/lib/i18n/get-dictionary"
import { getCurrentUser } from "@/lib/auth/session"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Locale } from "@/lib/i18n/config"

interface SettingsPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const user = await getCurrentUser()

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : user?.email[0].toUpperCase()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">{dict.dashboard.settings}</h1>
        <p className="mt-1 text-muted-foreground">{dict.dashboard.manageSettings}</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.profile}</CardTitle>
            <CardDescription>{dict.dashboard.updateProfile}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatar || undefined} />
                <AvatarFallback className="bg-primary text-2xl text-primary-foreground">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <Button variant="outline">{dict.dashboard.changeAvatar}</Button>
                <p className="mt-2 text-xs text-muted-foreground">{dict.dashboard.avatarHint}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">{dict.dashboard.name}</Label>
                <Input id="name" defaultValue={user?.name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{dict.dashboard.email}</Label>
                <Input id="email" type="email" defaultValue={user?.email} disabled />
              </div>
            </div>

            <Button>{dict.dashboard.saveChanges}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.dashboard.security}</CardTitle>
            <CardDescription>{dict.dashboard.managePassword}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">{dict.dashboard.currentPassword}</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div />
              <div className="space-y-2">
                <Label htmlFor="newPassword">{dict.dashboard.newPassword}</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{dict.dashboard.confirmPassword}</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>

            <Button>{dict.dashboard.updatePassword}</Button>
          </CardContent>
        </Card>

        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="text-destructive">{dict.dashboard.dangerZone}</CardTitle>
            <CardDescription>{dict.dashboard.irreversibleActions}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">{dict.dashboard.deleteAccount}</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
