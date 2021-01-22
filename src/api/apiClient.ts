import axios from 'axios'

export const baseURL = 'http://127.0.0.1:8000'
// export const baseURL = 'http://192.168.1.113:8000'

const apiClient = axios.create({
  baseURL: `${baseURL}/api`,
  withCredentials: true,
})

const authToken = localStorage.getItem('auth-token') || null
if (authToken) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
}

export default apiClient
