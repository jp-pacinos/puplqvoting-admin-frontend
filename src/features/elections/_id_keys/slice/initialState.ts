import { RequestStatus } from 'api/types'
import { studentKeysAdapter } from './adapters'

export interface StateProps extends ReturnType<typeof studentKeysAdapter.getInitialState> {
  electionId?: number

  status: RequestStatus
  pagination: {
    current_page: number
    per_page: number
    from: number
    to: number
    total: number
  }

  exportLink: string

  checkedCount: { withCode: number; all: number }

  groupDeleteModal: {
    open: boolean
  }
}

const initialState: StateProps = {
  electionId: undefined,

  ids: [],
  entities: {},
  status: 'idle',

  exportLink: '',

  pagination: {
    current_page: 0,
    per_page: 0,
    from: 0,
    to: 0,
    total: 0,
  },

  checkedCount: { withCode: 0, all: 0 },

  groupDeleteModal: {
    open: false,
  },
}

export default initialState
