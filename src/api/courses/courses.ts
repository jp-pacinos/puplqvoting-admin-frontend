import apiClient from 'api/apiClient'
import { ApiFunction } from './types'

const baseUrl = '/r/courses'

export const getCourses: ApiFunction.getCourses = ({ search, config = {} } = {}) => {
  let url = search ? `${baseUrl}?s=${search}` : baseUrl
  return apiClient.get(url, config)
}

export const addCourse: ApiFunction.addCourse = ({ data, config = {} }) => {
  return apiClient.post(baseUrl, data, config)
}

export const updateCourse: ApiFunction.updateCourse = ({ id, changes, config = {} }) => {
  return apiClient.post(
    `${baseUrl}/${id}`,
    {
      ...changes,
      _method: 'PATCH',
    },
    config
  )
}

export const deleteCourse: ApiFunction.deleteCourse = ({ id, config = {} }) => {
  return apiClient.post(`${baseUrl}/${id}`, { _method: 'DELETE' }, config)
}
