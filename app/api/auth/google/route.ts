import { NextResponse } from "next/server"
import { getGoogleAuthUrl } from "@/lib/auth/oauth"
import { features } from "@/lib/features"

export async function GET() {
  if (!features.oauth.google) {
    return NextResponse.json({ error: "Google OAuth not configured" }, { status: 404 })
  }

  const url = await getGoogleAuthUrl()
  if (!url) {
    return NextResponse.json({ error: "Failed to generate auth URL" }, { status: 500 })
  }

  return NextResponse.redirect(url)
}
