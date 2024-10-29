import type { ApiErrorResponse } from '@/types'
import { useToast } from 'vue-toastification'
import CToast from '@/components/plugins/CToast.vue'

export function handleErrorResponse(
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
      default:
        useToast().error({ component: CToast, props: { textType: 'network' } })
    }
  } else {
    useToast().error({ component: CToast, props: { textType: 'network' } })
  }
  throw error
}
