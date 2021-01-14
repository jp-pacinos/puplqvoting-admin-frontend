import axios from 'axios'

const apiClient = axios.create({
  baseURL: `http://127.0.0.1:8000/api`,
  // baseURL: `http://192.168.1.113:8000/api`,
})

// test
const tempToken = '1|UZLIiNBtLRbxVXUhAXTvy7RmLakNMcP6xCutycYy'

const authToken = localStorage.getItem('auth-token') || tempToken

apiClient.defaults.headers.common['Authorization'] = `Bearer ${authToken}`

export default apiClient
