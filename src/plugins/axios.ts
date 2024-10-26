import axios from 'axios'

// init axios
const instance = axios.create({
  timeout: 10000,
  baseURL: import.meta.env.VITE_BASE_URL,
})

export default instance
