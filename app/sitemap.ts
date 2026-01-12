import type { MetadataRoute } from "next"
import { locales, defaultLocale } from "@/lib/i18n/config"
import { getBaseUrl } from "@/lib/seo"

// 定义所有静态页面路由
const staticRoutes = [
  { path: "", changeFrequency: "daily" as const, priority: 1.0 },
  { path: "/docs", changeFrequency: "weekly" as const, priority: 0.8 },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl()
  const lastModified = new Date()

  const sitemapEntries: MetadataRoute.Sitemap = []

  // 为每种语言生成静态路由
  for (const locale of locales) {
    for (const route of staticRoutes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: locales.reduce(
            (acc, l) => {
              acc[l] = `${baseUrl}/${l}${route.path}`
              return acc
            },
            {} as Record<string, string>,
          ),
        },
      })
    }
  }

  // 默认语言根路由
  sitemapEntries.push({
    url: baseUrl,
    lastModified,
    changeFrequency: "daily",
    priority: 1.0,
    alternates: {
      languages: {
        [defaultLocale]: baseUrl,
        ...locales
          .filter((l) => l !== defaultLocale)
          .reduce(
            (acc, l) => {
              acc[l] = `${baseUrl}/${l}`
              return acc
            },
            {} as Record<string, string>,
          ),
      },
    },
  })

  return sitemapEntries
}
