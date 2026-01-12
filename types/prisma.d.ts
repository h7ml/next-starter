export type Role = "USER" | "ADMIN"

export type UserStatus = "ACTIVE" | "INACTIVE" | "BANNED"

export type PostStatus = "DRAFT" | "PUBLISHED" | "PENDING" | "REJECTED"

export interface User {
  id: string
  email: string
  emailVerified: Date | null
  password: string | null
  name: string | null
  avatar: string | null
  role: Role
  status: UserStatus
  country: string | null
  createdAt: Date
  updatedAt: Date
  accounts: Account[]
  sessions: Session[]
  posts: Post[]
  resetToken: string | null
  resetTokenExpiry: Date | null
}

export interface Account {
  id: string
  userId: string
  type: string
  provider: string
  providerAccountId: string
  refresh_token: string | null
  access_token: string | null
  expires_at: number | null
  token_type: string | null
  scope: string | null
  id_token: string | null
  session_state: string | null
  user: User
}

export interface Session {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  user: User
}

export interface VerificationToken {
  identifier: string
  token: string
  expires: Date
}

export interface Post {
  id: string
  title: string
  content: string | null
  published: boolean
  status: PostStatus
  views: number
  authorId: string
  author: User
  createdAt: Date
  updatedAt: Date
}

export interface SiteSettings {
  id: string
  siteName: string
  siteDescription: string
  contactEmail: string
  userRegistration: boolean
  oauthLogin: boolean
  emailNotifications: boolean
  postModeration: boolean
  maintenanceMode: boolean
  createdAt: Date
  updatedAt: Date
}
