import instance from '@/plugins/axios'

import type { UserInfo } from '@/types'

export const register = (user: {
  username: string
  email: string
  password: string
}): Promise<{ user: UserInfo }> => {
  return instance.post('/users', { user })
}

export const login = (user: {
  email: string
  password: string
}): Promise<{ user: UserInfo }> => {
  return instance.post('/users/login', { user })
}
