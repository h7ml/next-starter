# AGENTS 协作指南（中文）

本文件用于指导自动化开发代理在本项目中的协作方式与注意事项。

## 项目定位
这是一个生产就绪的 Next.js 启动模板，强调：
- App Router 架构
- TypeScript + Tailwind CSS + shadcn/ui
- Prisma + PostgreSQL

## 基础命令
```bash
npm run dev
npm run build
npm run lint
```

## 关键环境变量
在 `.env` 中确保以下变量存在：
- `DATABASE_URL`
- `AUTH_SECRET`
- `NEXT_PUBLIC_APP_URL`

## 数据库与认证
- Prisma 版本锁定为 6.x
- Schema 路径：`prisma/schema.prisma`
- 管理员初始化脚本：`scripts/001-create-auth-tables.sql`
- 密码哈希规则：`SHA-256(password + AUTH_SECRET)`

## 代码与组件约定
- Server Component 不应向 Client Component 传递 React 组件/函数对象。
- UI 优先复用 `components/ui` 与现有布局组件。
- 变更保持最小化，避免无关重构。

## 文档与多语言
- 英文文档：`README.md`
- 中文文档：`README.zh-CN.md`
