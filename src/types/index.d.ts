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
