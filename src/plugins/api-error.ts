import type { ApiErrorResponse } from '@/types'
import { useToast } from 'vue-toastification'
import CToast from '@/components/plugins/CToast.vue'
import { useUserStore } from '@/stores/user'
import router from '@/router'

export async function handleErrorResponse(
  error: {
    status: number
    data: ApiErrorResponse
  },
  title = '',
) {
  if (error) {
    const { data, status } = error
    switch (status) {
      // Unprocessable Content
      case 422:
        useToast().error({
          component: CToast,
          props: { additional: data.message, title: title },
        })
        break
      // Unauthenticated
      case 401:
        useToast().error({
          component: CToast,
          props: { additional: data.message, title: title },
        })
        await useUserStore().logout()
        break
      // unauthorized action
      case 403:
        useToast().error({
          component: CToast,
          props: { additional: data.message, title: 'Not Allowed! ' },
        })

        break
      // not found resource
      case 404:
        useToast().error({
          component: CToast,
          props: { additional: data.message, title: 'Not Found! ' },
        })
        await router.push({ name: 'Error' })
        break
      default:
        useToast().error({ component: CToast, props: { textType: 'network' } })
    }
  } else {
    useToast().error({ component: CToast, props: { textType: 'network' } })
  }
  throw error
}
