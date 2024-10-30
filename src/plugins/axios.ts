import axios from 'axios'
import { handleErrorResponse } from '@/plugins/api-error'
import { useUserStore } from '@/stores/user'

// init axios
export const instance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_BASE_URL,
})

instance.interceptors.request.use(
  async config => {
    // retrieve jwt-token if exist
    const token = useUserStore().token

    if (token) {
      config.headers.Authorization = `Token ${token}`
    }

    return config
  },
  error => Promise.reject(error),
)

instance.interceptors.response.use(
  ({ data }) => data,
  async ({ message, response }) => {
    // show network error toast
    await handleErrorResponse(response)
    return Promise.reject(response ? response.data : message)
  },
)

export default instance
