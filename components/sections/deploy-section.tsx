"use client"

import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { Dictionary } from "@/lib/i18n/get-dictionary"

interface DeploySectionProps {
  dict: Dictionary
}

export function DeploySection({ dict }: DeploySectionProps) {
  const platforms = [
    {
      name: "Vercel",
      description: dict.deploy.platforms.vercel,
      url: "https://vercel.com/new",
      recommended: true,
    },
    {
      name: "Cloudflare Pages",
      description: dict.deploy.platforms.cloudflare,
      url: "https://pages.cloudflare.com",
    },
    {
      name: "Netlify",
      description: dict.deploy.platforms.netlify,
      url: "https://app.netlify.com/start",
    },
    {
      name: "Railway",
      description: dict.deploy.platforms.railway,
      url: "https://railway.app/new",
    },
    {
      name: "Fly.io",
      description: dict.deploy.platforms.flyio,
      url: "https://fly.io",
    },
    {
      name: "Deno Deploy",
      description: dict.deploy.platforms.deno,
      url: "https://deno.com/deploy",
    },
  ]

  return (
    <section id="deploy" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{dict.deploy.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{dict.deploy.description}</p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((platform, index) => (
            <motion.div
              key={platform.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`h-full transition-all hover:border-primary/50 ${platform.recommended ? "ring-2 ring-primary/20" : ""}`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{platform.name}</CardTitle>
                    {platform.recommended && (
                      <span className="rounded-full bg-primary px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                        {dict.deploy.recommended}
                      </span>
                    )}
                  </div>
                  <CardDescription>{platform.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <a href={platform.url} target="_blank" rel="noopener noreferrer">
                      {dict.deploy.deployBtn}
                      <ExternalLink className="ml-2 h-3.5 w-3.5" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 rounded-xl border border-border bg-muted/50 p-6"
        >
          <h3 className="font-semibold">{dict.deploy.dockerTitle}</h3>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-card p-4 font-mono text-sm">
            <code className="text-muted-foreground">
              <span className="text-primary"># Build and run with Docker Compose</span>
              {"\n"}docker compose up -d{"\n\n"}
              <span className="text-primary"># Or build manually</span>
              {"\n"}docker build -t next-starter .{"\n"}docker run -p 3000:3000 next-starter
            </code>
          </pre>
        </motion.div>
      </div>
    </section>
  )
}
