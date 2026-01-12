import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { getBaseUrl } from "@/lib/seo"

interface FeedItem {
  title: string
  description: string
  link: string
  pubDate: Date
  guid: string
  category?: string[]
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

function generateRssFeed(
  items: FeedItem[],
  feedInfo: {
    title: string
    description: string
    link: string
    language: string
  },
): string {
  const itemsXml = items
    .map(
      (item) => `
    <item>
      <title>${escapeXml(item.title)}</title>
      <description>${escapeXml(item.description)}</description>
      <link>${item.link}</link>
      <guid isPermaLink="true">${item.guid}</guid>
      <pubDate>${item.pubDate.toUTCString()}</pubDate>
      ${item.category?.map((cat) => `<category>${escapeXml(cat)}</category>`).join("\n      ") || ""}
    </item>`,
    )
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(feedInfo.title)}</title>
    <description>${escapeXml(feedInfo.description)}</description>
    <link>${feedInfo.link}</link>
    <language>${feedInfo.language}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${feedInfo.link}/feed.xml" rel="self" type="application/rss+xml"/>
    <generator>Next.js</generator>
    <ttl>60</ttl>
    ${itemsXml}
  </channel>
</rss>`
}

export async function GET(request: Request) {
  const baseUrl = getBaseUrl()
  const { searchParams } = new URL(request.url)
  const locale = (searchParams.get("lang") as Locale) || "en"

  const dict = await getDictionary(locale)

  // 静态内容作为 feed 项目示例
  const feedItems: FeedItem[] = [
    {
      title: dict.hero.title + " " + dict.hero.titleHighlight,
      description: dict.hero.description,
      link: `${baseUrl}/${locale}`,
      pubDate: new Date(),
      guid: `${baseUrl}/${locale}`,
      category: ["Next.js", "Template", "Starter"],
    },
    {
      title: dict.features.title,
      description: dict.features.description,
      link: `${baseUrl}/${locale}#features`,
      pubDate: new Date(Date.now() - 86400000), // 1 day ago
      guid: `${baseUrl}/${locale}#features`,
      category: ["Features"],
    },
    {
      title: dict.techStack.title,
      description: dict.techStack.description,
      link: `${baseUrl}/${locale}#tech-stack`,
      pubDate: new Date(Date.now() - 172800000), // 2 days ago
      guid: `${baseUrl}/${locale}#tech-stack`,
      category: ["Technology"],
    },
    {
      title: dict.deploy.title,
      description: dict.deploy.description,
      link: `${baseUrl}/${locale}#deploy`,
      pubDate: new Date(Date.now() - 259200000), // 3 days ago
      guid: `${baseUrl}/${locale}#deploy`,
      category: ["Deployment", "DevOps"],
    },
  ]

  const feedXml = generateRssFeed(feedItems, {
    title: dict.metadata.title,
    description: dict.metadata.description,
    link: `${baseUrl}/${locale}`,
    language: locale,
  })

  return new Response(feedXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
