import type { Locale } from "@/lib/i18n/config"
import { getDictionary } from "@/lib/i18n/get-dictionary"
import { getBaseUrl, siteConfig } from "@/lib/seo"

interface AtomEntry {
  title: string
  summary: string
  link: string
  updated: Date
  id: string
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

function generateAtomFeed(
  entries: AtomEntry[],
  feedInfo: {
    title: string
    subtitle: string
    link: string
    id: string
    authorName: string
  },
): string {
  const entriesXml = entries
    .map(
      (entry) => `
  <entry>
    <title>${escapeXml(entry.title)}</title>
    <summary>${escapeXml(entry.summary)}</summary>
    <link href="${entry.link}" rel="alternate" type="text/html"/>
    <id>${entry.id}</id>
    <updated>${entry.updated.toISOString()}</updated>
    ${entry.category?.map((cat) => `<category term="${escapeXml(cat)}"/>`).join("\n    ") || ""}
  </entry>`,
    )
    .join("")

  return `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(feedInfo.title)}</title>
  <subtitle>${escapeXml(feedInfo.subtitle)}</subtitle>
  <link href="${feedInfo.link}" rel="alternate" type="text/html"/>
  <link href="${feedInfo.link}/atom.xml" rel="self" type="application/atom+xml"/>
  <id>${feedInfo.id}</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>${escapeXml(feedInfo.authorName)}</name>
  </author>
  <generator uri="https://nextjs.org">Next.js</generator>
  ${entriesXml}
</feed>`
}

export async function GET(request: Request) {
  const baseUrl = getBaseUrl()
  const { searchParams } = new URL(request.url)
  const locale = (searchParams.get("lang") as Locale) || "en"

  const dict = await getDictionary(locale)

  const atomEntries: AtomEntry[] = [
    {
      title: dict.hero.title + " " + dict.hero.titleHighlight,
      summary: dict.hero.description,
      link: `${baseUrl}/${locale}`,
      updated: new Date(),
      id: `${baseUrl}/${locale}`,
      category: ["Next.js", "Template", "Starter"],
    },
    {
      title: dict.features.title,
      summary: dict.features.description,
      link: `${baseUrl}/${locale}#features`,
      updated: new Date(Date.now() - 86400000),
      id: `${baseUrl}/${locale}#features`,
      category: ["Features"],
    },
    {
      title: dict.techStack.title,
      summary: dict.techStack.description,
      link: `${baseUrl}/${locale}#tech-stack`,
      updated: new Date(Date.now() - 172800000),
      id: `${baseUrl}/${locale}#tech-stack`,
      category: ["Technology"],
    },
    {
      title: dict.deploy.title,
      summary: dict.deploy.description,
      link: `${baseUrl}/${locale}#deploy`,
      updated: new Date(Date.now() - 259200000),
      id: `${baseUrl}/${locale}#deploy`,
      category: ["Deployment", "DevOps"],
    },
  ]

  const atomXml = generateAtomFeed(atomEntries, {
    title: dict.metadata.title,
    subtitle: dict.metadata.description,
    link: `${baseUrl}/${locale}`,
    id: `${baseUrl}/${locale}`,
    authorName: siteConfig.name,
  })

  return new Response(atomXml, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
