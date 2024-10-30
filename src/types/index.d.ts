export interface ApiErrorResponse {
  message: string
  errors?: {
    [key: string]: string[]
  }
}

export interface UserInfo {
  email: string
  token?: string
  username: string
  bio: string | null
  image: string | null
  password?: string
}

export interface AuthorInfo {
  username: string
  bio: null | string
  image: null | string
}

export interface ArticleInfo {
  slug: string
  title: string
  description: string
  body: string
  tagList: string[]
  createdAt: string
  updatedAt: string
  author: AuthorInfo
  favoritesCount: number
}

export interface ArticleSingle {
  title: string
  description: string
  body: string
  tagList: string[]
}

export interface PaginationMeta {
  next: boolean
  prev: boolean
  current: number
  total: number
}
