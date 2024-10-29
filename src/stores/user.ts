import { defineStore } from 'pinia'
import type { UserInfo } from '@/types'

export const useUserStore = defineStore('user', {
  state: () =>
    <UserInfo>{
      username: '',
      bio: null,
      image: null,
      email: '',
      token: '',
    },

  getters: {},

  actions: {
    isLogin() {
      return (
        this.token &&
        this.username &&
        this.username.length > 0 &&
        this.token.length > 0
      )
    },
    setUser(user: UserInfo) {
      this.username = user.username
      this.bio = user.bio
      this.image = user.image
      this.email = user.email
      this.token = user.token
    },
    clearUser() {
      this.username = ''
      this.bio = null
      this.image = null
      this.email = ''
      this.token = ''
    },
  },
})