import { ref } from 'vue'
import type { ApiErrorResponse } from '@/types'

// fetch api
export function useFetch<T>(
  promise: () => Promise<T>,
  onRes: null | ((response: T) => void) = null,
  onErr: null | ((error: ApiErrorResponse) => void) = null,
) {
  // reactive states
  const data = ref<T>()
  const error = ref()
  const loading = ref(false)

  const fetchData = () => {
    // put on loading state and retrieve url
    loading.value = true

    // call api
    promise()
      .then(res => {
        if (onRes != null) onRes(res)
        data.value = res
      })
      .catch(reason => {
        if (onErr != null) onErr(reason)
        error.value = reason
      })
      .finally(() => (loading.value = false))
  }

  return { data, error, loading, execute: fetchData }
}
