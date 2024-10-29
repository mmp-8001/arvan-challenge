import { useUserStore } from '@/stores/user'
import type {
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationNormalizedLoaded,
} from 'vue-router'

export const authMiddleware = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalizedLoaded,
  next: NavigationGuardNext,
) => {
  const store = useUserStore()
  const WHITE_LIST = ['Login', 'Register']

  if (store.isLoggedIn()) {
    next()
  } else {
    if (WHITE_LIST.includes(to.name as string)) {
      next()
    } else {
      next('/login')
    }
  }
}
