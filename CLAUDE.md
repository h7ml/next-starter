# Claude 使用指南

本文件用于说明本项目的基本信息与常用操作，方便在使用 Claude 辅助开发时快速对齐上下文。

## 项目概览
- Next.js 16 App Router + React
- TypeScript + Tailwind CSS + shadcn/ui
- Prisma ORM + PostgreSQL

## 常用命令
```bash
npm run dev
npm run build
npm run lint
```

## 数据库与 Prisma
- Prisma 版本：6.x（已与当前 schema 兼容）
- Schema：`prisma/schema.prisma`
- 常用命令：
```bash
npx prisma generate
npx prisma db push
npx prisma studio
```

## 环境变量
请确保 `.env` 中包含以下关键变量：
- `DATABASE_URL`：数据库连接串
- `AUTH_SECRET`：密码哈希所需密钥
- `NEXT_PUBLIC_APP_URL`：用于 OAuth 回调等场景

## 认证与管理员
登录密码校验使用 `SHA-256(password + AUTH_SECRET)`，初始化脚本位于：
- `scripts/001-create-auth-tables.sql`

## 开发注意事项
- Server Component 只能向 Client Component 传递可序列化数据，避免传入 React 组件/函数对象。
- 组件尽量复用 `components/ui` 与 `components/sections` 现有样式与结构。
