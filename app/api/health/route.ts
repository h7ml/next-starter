import { NextResponse } from "next/server"
import buildInfo from "@/lib/build-info.json"

export const runtime = "nodejs"

export async function GET() {
  return NextResponse.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
    deployment: {
      buildTime: buildInfo.buildTime,
      platform: buildInfo.platform,
      platformUrl: buildInfo.platformUrl,
      git: {
        commitHash: buildInfo.git.commitHash,
        commitShort: buildInfo.git.commitShort,
        commitMessage: buildInfo.git.commitMessage,
        author: buildInfo.git.author,
        repo: buildInfo.git.repo,
        branch: buildInfo.git.branch,
      },
    },
  })
}
