import { type NextRequest, NextResponse } from "next/server"
import { getGoogleProfile, handleOAuthSignIn } from "@/lib/auth/oauth"
import { createSession } from "@/lib/auth/session"
import { features } from "@/lib/features"

export async function GET(request: NextRequest) {
  if (!features.oauth.google) {
    return NextResponse.redirect(new URL("/login?error=oauth_not_configured", request.url))
  }

  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=no_code", request.url))
  }

  try {
    const profile = await getGoogleProfile(code)
    if (!profile) {
      return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url))
    }

    const user = await handleOAuthSignIn("google", profile)
    await createSession(user.id)

    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch {
    return NextResponse.redirect(new URL("/login?error=oauth_failed", request.url))
  }
}
