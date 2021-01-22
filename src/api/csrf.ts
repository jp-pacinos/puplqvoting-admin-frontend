import apiClient, { baseURL } from 'api/apiClient'

const csrf = () => {
  return apiClient.get('/sanctum/csrf-cookie', {
    baseURL,
  })
}

export default csrf
