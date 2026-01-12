import { getDictionary } from "@/lib/i18n/get-dictionary"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import type { Locale } from "@/lib/i18n/config"

interface AdminSettingsPageProps {
  params: Promise<{ locale: Locale }>
}

export default async function AdminSettingsPage({ params }: AdminSettingsPageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{dict.admin.settings}</h1>
        <p className="mt-1 text-muted-foreground">{dict.admin.configureSystemSettings}</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{dict.admin.siteSettings}</CardTitle>
            <CardDescription>{dict.admin.siteSettingsDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>{dict.admin.siteName}</Label>
              <Input defaultValue="Next Starter Template" />
            </div>
            <div className="grid gap-2">
              <Label>{dict.admin.siteDescription}</Label>
              <Input defaultValue="A production-ready Next.js starter template" />
            </div>
            <div className="grid gap-2">
              <Label>{dict.admin.contactEmail}</Label>
              <Input type="email" defaultValue="contact@example.com" />
            </div>
            <Button>{dict.admin.save}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{dict.admin.featureToggles}</CardTitle>
            <CardDescription>{dict.admin.featureTogglesDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{dict.admin.userRegistration}</p>
                <p className="text-sm text-muted-foreground">{dict.admin.userRegistrationDesc}</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{dict.admin.oauthLogin}</p>
                <p className="text-sm text-muted-foreground">{dict.admin.oauthLoginDesc}</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{dict.admin.emailNotifications}</p>
                <p className="text-sm text-muted-foreground">{dict.admin.emailNotificationsDesc}</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{dict.admin.postModeration}</p>
                <p className="text-sm text-muted-foreground">{dict.admin.postModerationDesc}</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{dict.admin.maintenanceMode}</p>
                <p className="text-sm text-muted-foreground">
                  {dict.admin.maintenanceModeDescription}
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">{dict.admin.dangerZone}</CardTitle>
            <CardDescription>{dict.admin.dangerZoneDesc}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
              <div>
                <p className="font-medium">{dict.admin.clearCache}</p>
                <p className="text-sm text-muted-foreground">{dict.admin.clearCacheDesc}</p>
              </div>
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
              >
                {dict.admin.clearCacheBtn}
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
              <div>
                <p className="font-medium">{dict.admin.resetDatabase}</p>
                <p className="text-sm text-muted-foreground">{dict.admin.resetDatabaseDesc}</p>
              </div>
              <Button variant="destructive">{dict.admin.resetDatabaseBtn}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
