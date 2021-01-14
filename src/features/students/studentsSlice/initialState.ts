import { StateProps } from './types'
import { RequestStatus } from 'common/constants'

const initialState: StateProps = {
  ids: [],
  entities: {},
  status: RequestStatus.idle,
  pagination: {
    current_page: 0,
    per_page: 0,
    from: 0,
    to: 0,
    total: 0,
  },

  checkedCount: { students: 0, officers: 0 },

  addModal: {
    open: false,
    status: RequestStatus.idle,
    validation: {
      message: '',
      errors: {},
    },
  },

  editModal: {
    open: false,
    studentId: 0,
    status: RequestStatus.idle,
    validation: {
      message: '',
      errors: {},
    },
  },

  deleteModal: {
    open: false,
    studentId: 0,
  },

  groupEditModal: {
    open: false,
    status: RequestStatus.idle,
    studentIds: [],
  },

  groupDeleteModal: {
    open: false,
    studentIds: [],
  },
}

export default initialState
