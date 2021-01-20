import apiClient from 'api/apiClient'
import { ApiFunction } from './types'

const baseUrl = '/r/courses'

export const getCourses: ApiFunction.getCourses = ({ config = {} }) => {
  return apiClient.get(baseUrl, config)
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
