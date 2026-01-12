import { NextResponse } from "next/server"
import { getGitHubAuthUrl } from "@/lib/auth/oauth"
import { features } from "@/lib/features"

export async function GET() {
  if (!features.oauth.github) {
    return NextResponse.json({ error: "GitHub OAuth not configured" }, { status: 404 })
  }

  const url = await getGitHubAuthUrl()
  if (!url) {
    return NextResponse.json({ error: "Failed to generate auth URL" }, { status: 500 })
  }

  return NextResponse.redirect(url)
}
