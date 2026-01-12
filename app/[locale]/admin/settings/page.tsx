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
        <p className="mt-1 text-muted-foreground">{locale === "zh" ? "配置系统设置" : "Configure system settings"}</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{locale === "zh" ? "网站设置" : "Site Settings"}</CardTitle>
            <CardDescription>
              {locale === "zh" ? "配置基本网站信息" : "Configure basic site information"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label>{locale === "zh" ? "网站名称" : "Site Name"}</Label>
              <Input defaultValue="Next Starter Template" />
            </div>
            <div className="grid gap-2">
              <Label>{locale === "zh" ? "网站描述" : "Site Description"}</Label>
              <Input defaultValue="A production-ready Next.js starter template" />
            </div>
            <div className="grid gap-2">
              <Label>{locale === "zh" ? "联系邮箱" : "Contact Email"}</Label>
              <Input type="email" defaultValue="contact@example.com" />
            </div>
            <Button>{locale === "zh" ? "保存更改" : "Save Changes"}</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{locale === "zh" ? "功能开关" : "Feature Toggles"}</CardTitle>
            <CardDescription>
              {locale === "zh" ? "启用或禁用系统功能" : "Enable or disable system features"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{locale === "zh" ? "用户注册" : "User Registration"}</p>
                <p className="text-sm text-muted-foreground">
                  {locale === "zh" ? "允许新用户注册账号" : "Allow new users to register"}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{locale === "zh" ? "OAuth 登录" : "OAuth Login"}</p>
                <p className="text-sm text-muted-foreground">
                  {locale === "zh" ? "允许通过 GitHub/Google 登录" : "Allow login via GitHub/Google"}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{locale === "zh" ? "邮件通知" : "Email Notifications"}</p>
                <p className="text-sm text-muted-foreground">
                  {locale === "zh" ? "发送系统通知邮件" : "Send system notification emails"}
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{locale === "zh" ? "文章审核" : "Post Moderation"}</p>
                <p className="text-sm text-muted-foreground">
                  {locale === "zh" ? "发布前需要管理员审核" : "Require admin approval before publishing"}
                </p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{locale === "zh" ? "维护模式" : "Maintenance Mode"}</p>
                <p className="text-sm text-muted-foreground">
                  {locale === "zh" ? "暂时关闭网站访问" : "Temporarily disable site access"}
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">{locale === "zh" ? "危险操作" : "Danger Zone"}</CardTitle>
            <CardDescription>
              {locale === "zh"
                ? "这些操作不可撤销，请谨慎操作"
                : "These actions are irreversible. Please proceed with caution."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
              <div>
                <p className="font-medium">{locale === "zh" ? "清空所有缓存" : "Clear All Cache"}</p>
                <p className="text-sm text-muted-foreground">
                  {locale === "zh" ? "清除系统缓存数据" : "Clear all system cache data"}
                </p>
              </div>
              <Button
                variant="outline"
                className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
              >
                {locale === "zh" ? "清空缓存" : "Clear Cache"}
              </Button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-destructive/50 p-4">
              <div>
                <p className="font-medium">{locale === "zh" ? "重置数据库" : "Reset Database"}</p>
                <p className="text-sm text-muted-foreground">
                  {locale === "zh" ? "删除所有数据并重置数据库" : "Delete all data and reset the database"}
                </p>
              </div>
              <Button variant="destructive">{locale === "zh" ? "重置数据库" : "Reset Database"}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
