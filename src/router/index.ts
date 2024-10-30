import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/auth/LoginView.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { authMiddleware } from '@/middleware/authRouter'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  strict: true,
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          name: 'Home',
          path: '/',
          redirect: '/articles',
        },
        {
          name: 'ArticlesEdit',
          path: '/articles/edit/:slug',
          // route level code-splitting
          component: () => import('../views/EditArticleView.vue'),
        },
        {
          name: 'ArticlesCreate',
          path: '/articles/create',
          // route level code-splitting
          component: () => import('../views/CreateArticleView.vue'),
        },
        {
          alias: '/articles',
          path: '/articles/page/:page(\\d+)?',
          // route level code-splitting
          component: () => import('../views/ArticlesView.vue'),
          name: 'Articles',
          props: route => ({ page: parseInt(<never>route.params.page) || 1 }),
        },
        {
          name: 'Error',
          path: '/404',
          // route level code-splitting
          component: () => import('../views/ErrorView.vue'),
        },
      ],
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
    { path: '/:pathMatch(.*)*', redirect: { name: 'Error' } },
  ],
})

// add middlewares
router.beforeEach(authMiddleware)

export default router
