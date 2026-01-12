# Next 启动模板

[English](README.md) | 简体中文

一个生产就绪的 Next.js 启动模板，包含 React、TypeScript、Tailwind CSS、shadcn/ui、Prisma 和 Docker 支持。

## 功能特性

- **Next.js 16** - 最新 App Router 与 React Server Components
- **TypeScript** - 严格模式下的完整类型安全
- **Tailwind CSS v4** - 实用优先的样式方案
- **shadcn/ui** - 美观且可访问的组件库
- **Framer Motion** - 流畅的动画效果
- **Lucide Icons** - 高质量图标库
- **Prisma** - 类型安全的数据库 ORM
- **Docker** - 容器化部署支持
- **多平台部署** - 可部署到 Vercel、Cloudflare、Netlify、Railway、Fly.io 等

## 快速开始

```bash
# 克隆仓库
npx create-next-app -e https://github.com/h7ml/next-starter next-starter

# 进入项目目录
cd next-starter

# 安装依赖
npm install

# 配置环境变量
cp .env.example .env

# 启动开发服务器
npm run dev
```

## 数据库设置

```bash
# 生成 Prisma Client
npx prisma generate

# 推送 schema 到数据库
npx prisma db push

# 打开 Prisma Studio
npx prisma studio
```

## Docker 部署

```bash
# 使用 Docker Compose 构建并运行
docker compose up -d

# 或手动构建
docker build -t next-starter .
docker run -p 3000:3000 next-starter
```

## 项目结构

```
├── app/                  # Next.js App Router 页面
│   ├── api/             # API 路由
│   ├── docs/            # 文档页面
│   └── page.tsx         # 首页
├── components/          # React 组件
│   ├── layout/          # 布局组件
│   ├── sections/        # 页面区块
│   ├── providers/       # 上下文提供者
│   └── ui/              # shadcn/ui 组件
├── lib/                 # 工具库
│   ├── db.ts           # Prisma 客户端
│   ├── env.ts          # 环境变量校验
│   └── utils.ts        # 通用工具函数
├── prisma/              # 数据库
│   └── schema.prisma   # Prisma 模型
├── Dockerfile          # Docker 配置
├── docker-compose.yml  # Docker Compose 配置
├── fly.toml            # Fly.io 配置
├── netlify.toml        # Netlify 配置
├── railway.yaml        # Railway 配置
└── vercel.json         # Vercel 配置
```

## 部署

| 平台 | 指南 |
|----------|-------|
| Vercel | [Deploy](https://vercel.com/new) |
| Cloudflare Pages | [Deploy](https://pages.cloudflare.com) |
| Netlify | [Deploy](https://app.netlify.com/start) |
| Railway | [Deploy](https://railway.app/new) |
| Fly.io | `fly launch && fly deploy` |
| Deno Deploy | [Deploy](https://deno.com/deploy) |

## 许可证

MIT License - 你可以自由地将该模板用于任何项目。
