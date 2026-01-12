import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db"
import { generateResetToken } from "@/lib/auth/password"
import { authConfig } from "@/lib/auth/config"
import { z } from "zod"

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = forgotPasswordSchema.parse(body)

    const user = await db.user.findUnique({
      where: { email },
    })

    // 无论用户是否存在都返回成功（安全考虑）
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists, a reset link will be sent",
      })
    }

    // 生成重置 Token
    const resetToken = generateResetToken()
    const resetTokenExpiry = new Date(Date.now() + authConfig.resetTokenExpiry)

    await db.user.update({
      where: { id: user.id },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    })

    // TODO: 发送邮件（这里只返回 token 用于测试）
    // 生产环境应通过邮件发送重置链接
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

    return NextResponse.json({
      success: true,
      message: "If an account exists, a reset link will be sent",
      // 仅开发环境返回
      ...(process.env.NODE_ENV === "development" && { resetUrl }),
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
