import { RequestStatus } from 'common/constants'
import { StateProps } from './types'

const initialState: StateProps = {
  ids: [],
  entities: {},
  status: RequestStatus.idle,

  pagination: {
    currentPage: 0,
    perPage: 0,
    from: 0,
    to: 0,
    total: 0,
  },

  selected: {
    election: undefined,
  },
}

export default initialState
