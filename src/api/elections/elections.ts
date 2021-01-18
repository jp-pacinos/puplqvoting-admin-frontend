import apiClient from 'api/apiClient'
import { ApiFunction } from './types'

const baseURL = '/r/sessions'

export const getActiveElection: ApiFunction.getActiveElection = ({ config = {} } = {}) => {
  return apiClient.get(`${baseURL}/election/active`, config)
}

export const getElections: ApiFunction.getElections = ({ page = 1, search = '', config = {} }) => {
  let url = `${baseURL}?page=${page}`
  if (search) url += `&search=${search}`
  return apiClient.get(url, config)
}

export const getElection: ApiFunction.getElection = ({ id, config = {} }) => {
  return apiClient.get(`${baseURL}/${id}/dashboard`, config)
}

export const addElection: ApiFunction.addElection = ({ data, config = {} }) => {
  return apiClient.post(baseURL, data, config)
}

export const deteleElection: ApiFunction.deleteElection = ({ id, confirmation, config = {} }) => {
  return apiClient.post(
    `${baseURL}/${id}`,
    {
      confirmation,
      _method: 'DELETE',
    },
    config
  )
}

// settings

const settingsURL = <T = number>(id: T) => `${baseURL}/${id}/settings`

export const getElectionSettings: ApiFunction.getElectionSettings = ({ id, config = {} }) => {
  return apiClient.get(settingsURL(id), config)
}

export const updateElectionStatus: ApiFunction.updateElectionStatus = ({
  id,
  data,
  config = {},
}) => {
  return apiClient.post(`${settingsURL(id)}/finished`, data, config)
}

export const updateElectionBasicDetails: ApiFunction.updateElectionBasicDetails = ({
  id,
  data,
  config = {},
}) => {
  return apiClient.post(`${settingsURL(id)}/details`, data, config)
}

export const updateElectionRegistration: ApiFunction.updateElectionRegistration = ({
  id,
  data,
  config = {},
}) => {
  return apiClient.post(
    `${settingsURL(id)}/registration`,
    {
      type: data.registration,
    },
    config
  )
}

export const updateElectionVerificationType: ApiFunction.updateElectionVerificationType = ({
  id,
  data,
  config = {},
}) => {
  return apiClient.post(
    `${settingsURL(id)}/verification-type`,
    {
      type: data.verificationType,
    },
    config
  )
}

// actions

const actionsURL = <T = number>(id: T) => `${baseURL}/${id}/actions`

export const selectElection: ApiFunction.selectElection = (id) => {
  return apiClient.post(`${actionsURL(id)}/select`)
}

export const unselectElection: ApiFunction.unselectelection = (id) => {
  return apiClient.post(`${actionsURL(id)}/select/${id}`, {
    _method: 'DELETE',
  })
}

export const startElectionRegistration: ApiFunction.startElectionRegistration = (id) => {
  return apiClient.post(`${actionsURL(id)}/start-registration`)
}

export const stopElectionRegistration: ApiFunction.stopElectionRegistration = (id) => {
  return apiClient.post(`${actionsURL(id)}/start-registration/${id}`, {
    _method: 'DELETE',
  })
}

export const startElection: ApiFunction.startElection = (id) => {
  return apiClient.post(`${actionsURL(id)}/start`)
}

export const stopElection: ApiFunction.startElection = (id) => {
  return apiClient.post(`${actionsURL(id)}/start/${id}`, {
    _method: 'DELETE',
  })
}

// stats

const statsURL = <T = number>(id: T) => `${baseURL}/${id}/stats`

export const getStreamStats: ApiFunction.getStreamStats = ({
  sessionId,
  options: filters = {},
  config = {},
}) => {
  let url = `${statsURL(sessionId)}/stream?q=1`

  if (Boolean(filters.partyId)) url += `&partyId=${filters.partyId}`
  if (Boolean(filters.positionId)) url += `&positionId=${filters.positionId}`
  if (Boolean(filters.officialId)) url += `&officialId=${filters.officialId}`
  if (Boolean(filters.courseId)) url += `&courseId=${filters.courseId}`
  if (Boolean(filters.gender)) url += `&gender=${filters.gender}`

  return apiClient.get(url, config)
}

export const getStudentVotes: ApiFunction.getStudentVotes = ({
  sessionId,
  filters = {},
  config = {},
}) => {
  let url = `${statsURL(sessionId)}/student-votes?q=1`

  if (Boolean(filters.partyId)) url += `&partyId=${filters.partyId}`
  if (Boolean(filters.positionId)) url += `&positionId=${filters.positionId}`
  if (Boolean(filters.officialId)) url += `&officialId=${filters.officialId}`
  if (Boolean(filters.courseId)) url += `&courseId=${filters.courseId}`
  if (Boolean(filters.gender)) url += `&gender=${filters.gender}`

  return apiClient.get(url, config)
}

// keys

const keysURL = <T = number>(id: T) => `${baseURL}/${id}/studentKeys`

export const getStudentKeys: ApiFunction.getStudentKeys = ({
  sessionId,
  filters = {},
  config = {},
}) => {
  let url = `${keysURL(sessionId)}?page=${filters.page}&perpage=${filters.perpage}`

  if (Boolean(filters.studentNumber)) url += `&studentnumber=${filters.studentNumber}`
  if (Boolean(filters.courseId)) url += `&course=${filters.courseId}`
  if (Boolean(filters.gender)) url += `&gender=${filters.gender}`
  if (Boolean(filters.code)) url += `&code=${filters.code}`

  return apiClient.get(url, config)
}

export const addStudentKey: ApiFunction.addStudentKey = ({ sessionId, studentId, config = {} }) => {
  return apiClient.post(
    `${keysURL(sessionId)}`,
    {
      studentid: studentId,
    },
    config
  )
}

export const deleteStudentKey: ApiFunction.deleteStudentKey = ({
  sessionId,
  studentId,
  config = {},
}) => {
  return apiClient.post(
    `${keysURL(sessionId)}`,
    {
      studentid: studentId,
      _method: 'DELETE',
    },
    config
  )
}

export const addStudentKeysGroup: ApiFunction.addStudentKeysGroup = ({
  sessionId,
  studentIds,
  config = {},
}) => {
  return apiClient.post(
    `${keysURL(sessionId)}/group/update`,
    {
      studentsIds: studentIds,
    },
    config
  )
}

export const deleteStudentKeysGroup: ApiFunction.deleteStudentKeysGroup = ({
  sessionId,
  studentIds,
  config = {},
}) => {
  return apiClient.post(
    `${keysURL(sessionId)}/group/delete`,
    {
      studentsIds: studentIds,
      _method: 'DELETE',
    },
    config
  )
}
