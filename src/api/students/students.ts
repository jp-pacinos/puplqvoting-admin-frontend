import apiClient from 'api/apiClient'
import { ApiFunction } from './types'

export const studentUrl = '/r/students'

export const getStudents: ApiFunction.getStudents = ({
  page = 1,
  perPage = 10,
  filters = {},
  options = {},
}) => {
  let url = `${studentUrl}?page=${page}&perpage=${perPage}`

  if (filters.studentNumber) url += `&studentnumber=${filters.studentNumber}`
  if (filters.courseId) url += `&course=${filters.courseId}`
  if (filters.yearLevel) url += `&yrlevel=${filters.yearLevel}`
  if (filters.gender) url += `&gender=${filters.gender}`
  if (filters.voter) url += `&voter=${filters.voter}`

  return apiClient.get(url, options)
}

export const getStudent: ApiFunction.getStudent = (id) => {
  return apiClient.get(`${studentUrl}/${id}`)
}

export const createStudent: ApiFunction.createStudent = (data) => {
  return apiClient.post(studentUrl, data)
}

export const updateStudent: ApiFunction.updateStudent = (id, data) => {
  return apiClient.post(`${studentUrl}/${id}`, {
    _method: 'PATCH',
    ...data,
  })
}

export const removeStudent: ApiFunction.deleteStudent = (id) => {
  return apiClient.post(`${studentUrl}/${id}`, {
    _method: 'DELETE',
  })
}

export const groupUpdate: ApiFunction.groupStudentsUpdate = (data) => {
  return apiClient.post(`${studentUrl}/group/update`, data)
}

export const groupRemove: ApiFunction.groupStudentsDelete = (ids) => {
  return apiClient.post(`${studentUrl}/group/delete`, {
    studentIds: ids,
  })
}
