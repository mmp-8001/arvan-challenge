import axios from 'axios'
import { handleErrorResponse } from '@/plugins/api-error'

// init axios
export const instance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_BASE_URL,
})

instance.interceptors.request.use(
  config => {
    // retrieve jwt-token if exist
    const token = localStorage.getItem('jwt-token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => Promise.reject(error),
)

instance.interceptors.response.use(
  ({ data }) => data,
  ({ message, response }) => {
    // show network error toast
    handleErrorResponse(response)
    return Promise.reject(response ? response.data : message)
  },
)

export default instance
