import apiClient from 'api/apiClient'
import { ApiFunction } from './types'

export const partiesUrl = '/r/parties'

export const getParties: ApiFunction.getParties = ({ page = 1, filters = {}, options = {} }) => {
  let url = `${partiesUrl}?page=${page}`

  if (filters.s) url += `&s=${filters.s}`
  if (filters.session) url += `&session=${filters.session}`

  return apiClient.get(url, options)
}

export const getParty: ApiFunction.getParty = ({ id, options = {} }) => {
  return apiClient.get(`${partiesUrl}/${id}`, options)
}

export const addParty: ApiFunction.addParty = ({ party, options = {} }) => {
  return apiClient.post(`${partiesUrl}`, party, options)
}

export const updateParty: ApiFunction.updateParty = ({ id, changes, options = {} }) => {
  return apiClient.post(
    `${partiesUrl}/${id}`,
    {
      _method: 'PATCH',
      ...changes,
    },
    options
  )
}

export const deleteParty: ApiFunction.deleteParty = ({ id, options = {} }) => {
  return apiClient.post(
    `${partiesUrl}/${id}`,
    {
      _method: 'DELETE',
    },
    options
  )
}

// end crud

//

export const partyUrl = '/r/party'

export const studentsSearch: ApiFunction.studentsSearch = ({
  page = 1,
  filters = {},
  options = {},
}) => {
  let {
    studentnumber = '',
    courseid = '',
    firstname = '',
    lastname = '',
    middlename = '',
  } = filters

  let url: string = `${partyUrl}/students/find?page=${page}`
  url += studentnumber && `&studentnumber=${studentnumber}`
  url += courseid && `&courseid=${courseid}`
  url += lastname && `&lastname=${lastname}`
  url += firstname && `&firstname=${firstname}`
  url += middlename && `&middlename=${middlename}`

  return apiClient.get(url, options)
}

export const makeOfficial: ApiFunction.makeOfficial = ({ partyId, studentId }) => {
  return apiClient.post(`${partyUrl}/${partyId}/official`, {
    student_id: studentId,
  })
}

export const removeOfficial: ApiFunction.removeOfficial = ({ partyId, officialId }) => {
  return apiClient.post(`${partyUrl}/${partyId}/official/${officialId}`, {
    _method: 'DELETE',
  })
}

export const updateOfficialPosition: ApiFunction.updateOfficialPosition = ({
  officialId,
  positionId,
}) => {
  return apiClient.post(`${partyUrl}/official/${officialId}/position`, {
    position_id: positionId,
    _method: 'PATCH',
  })
}

export const updateOfficialPicture: ApiFunction.updateOfficialPicture = ({
  officialId,
  newImage,
}) => {
  let url = `${partyUrl}/official/${officialId}/picture`
  let data = new FormData()
  data.append('official_image', newImage)

  return apiClient.post(url, data)
}

export const deleteOfficialPicture: ApiFunction.deleteOfficialPicture = ({ officialId }) => {
  let url = `${partyUrl}/official/${officialId}/picture`

  return apiClient.post(url, {
    _method: 'DELETE',
  })
}
