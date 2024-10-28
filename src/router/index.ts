import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      component: AuthLayout,
      children: [
        {
          path: 'register',
          name: 'Register',
          // route level code-splitting
          component: () => import('../views/auth/RegisterView.vue'),
          alias: '/register',
        },
        {
          path: 'login',
          name: 'Login',
          component: LoginView,
          alias: '/login',
        },
      ],
    },
  ],
})

export default router
