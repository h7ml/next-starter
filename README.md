# Next Starter Template

A production-ready Next.js starter template with React, TypeScript, Tailwind CSS, shadcn/ui, Prisma, and Docker support.

## Features

- **Next.js 16** - Latest App Router with React Server Components
- **TypeScript** - Full type safety with strict mode
- **Tailwind CSS v4** - Utility-first styling
- **shadcn/ui** - Beautiful, accessible components
- **Framer Motion** - Smooth animations
- **Lucide Icons** - Beautiful icon library
- **Prisma** - Type-safe database ORM
- **Docker** - Containerized deployments
- **Multi-Platform** - Deploy to Vercel, Cloudflare, Netlify, Railway, Fly.io, and more

## Quick Start

```bash
# Clone the repository
npx create-next-app -e https://github.com/your/next-starter my-app

# Navigate to project
cd my-app

# Install dependencies
npm install

# Set up environment
cp .env.example .env

# Start development server
npm run dev
```

## Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Open Prisma Studio
npx prisma studio
```

## Docker Deployment

```bash
# Build and run with Docker Compose
docker compose up -d

# Or build manually
docker build -t next-starter .
docker run -p 3000:3000 next-starter
```

## Project Structure

```
├── app/                  # Next.js App Router
│   ├── api/             # API routes
│   ├── docs/            # Documentation page
│   └── page.tsx         # Home page
├── components/          # React components
│   ├── layout/          # Layout components
│   ├── sections/        # Page sections
│   ├── providers/       # Context providers
│   └── ui/              # shadcn/ui components
├── lib/                 # Utilities
│   ├── db.ts           # Prisma client
│   ├── env.ts          # Environment validation
│   └── utils.ts        # Helper functions
├── prisma/              # Database
│   └── schema.prisma   # Prisma schema
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose config
├── fly.toml            # Fly.io config
├── netlify.toml        # Netlify config
├── railway.yaml        # Railway config
└── vercel.json         # Vercel config
```

## Deploy

| Platform | Guide |
|----------|-------|
| Vercel | [Deploy](https://vercel.com/new) |
| Cloudflare Pages | [Deploy](https://pages.cloudflare.com) |
| Netlify | [Deploy](https://app.netlify.com/start) |
| Railway | [Deploy](https://railway.app/new) |
| Fly.io | `fly launch && fly deploy` |
| Deno Deploy | [Deploy](https://deno.com/deploy) |

## License

MIT License - feel free to use this template for any project.
