import apiClient from 'api/apiClient'
import { ApiFunction } from './types'

const baseUrl = '/auth/login/admin'

export const login: ApiFunction.login = (data) => {
  return apiClient.post(baseUrl, data)
}

export const updateUser: ApiFunction.updateUser = ({ id, data }) => {
  let _data = {
    name: data.name,
    username: data.email,
    password: data.password,
    password_confirmation: data.confirmPassword,
    oldPassword: data.oldPassword,
  }

  return apiClient.post(`${baseUrl}/${id}`, {
    ..._data,
    _method: 'PATCH',
  })
}
