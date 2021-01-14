import { RequestStatus } from 'common/constants'
import { officialsAdapter, addOfficialsAdapter } from './adapters'
import { StateProps } from './types'

const initialState: StateProps = {
  party: {
    id: 0,
    name: 'Party',
    description: 'No description',
    session_id: 0,
    created_at: '',
    updated_at: '',
  },
  status: RequestStatus.idle,
  officials: officialsAdapter.getInitialState([]),

  search: {
    status: RequestStatus.idle,
    students: addOfficialsAdapter.getInitialState([]),
    pagination: {
      per_page: 5,
      from: 0,
      to: 0,
      total: 0,
    },
  },

  modalAddPicture: {
    open: false,
    officialId: null,
    status: RequestStatus.idle,
  },
}

export default initialState
