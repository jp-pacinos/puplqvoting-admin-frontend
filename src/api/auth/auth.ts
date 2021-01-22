import apiClient from 'api/apiClient'
import { ApiFunction } from './types'

const baseUrl = '/auth/login/admin'

export const login: ApiFunction.login = (data) => {
  return apiClient.post(baseUrl, data)
}
