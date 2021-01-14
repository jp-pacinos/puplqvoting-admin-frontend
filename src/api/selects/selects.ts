import apiClient from 'api/apiClient'
import { ApiFunction } from './types'

export const baseUrl = '/selects'

export const getAll: ApiFunction.getAll = (options = {}) => {
  return apiClient.get(`${baseUrl}`, options)
}
