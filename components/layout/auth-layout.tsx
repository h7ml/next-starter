"use client"

import type React from "react"
import { motion } from "framer-motion"
import { AuthHeader } from "@/components/layout/auth-header"
import { Footer } from "@/components/layout/footer"
import type { Dictionary } from "@/lib/i18n/get-dictionary"
import type { Locale } from "@/lib/i18n/config"

interface AuthLayoutProps {
  children: React.ReactNode
  locale: Locale
  dict: Dictionary
}

export function AuthLayout({ children, locale, dict }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <AuthHeader locale={locale} dict={dict} />
      <main className="relative flex flex-1 items-center justify-center bg-gradient-to-br from-background via-background to-muted/50 px-4 py-12 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

        <motion.div
          className="absolute top-20 left-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
          animate={{
            y: [0, 30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 h-80 w-80 rounded-full bg-primary/10 blur-3xl"
          animate={{
            y: [0, -40, 0],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        {children}
      </main>
      <Footer dict={dict} locale={locale} />
    </div>
  )
}
