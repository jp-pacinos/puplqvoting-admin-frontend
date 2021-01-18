import { RequestStatus } from 'api/types'
import { Student, StudentVoteKeys } from 'api/types/Models'
import { studentKeysAdapter } from './adapters'

export type StudentKeys = Pick<StudentVoteKeys.Fields, 'id' | 'confirmation_code'> &
  Pick<
    Student.Fields,
    | 'student_number'
    | 'lastname'
    | 'firstname'
    | 'middlename'
    | 'suffix'
    | 'sex'
    | 'can_vote'
    | 'course_id'
  >

export interface StateProps extends ReturnType<typeof studentKeysAdapter.getInitialState> {
  status: RequestStatus
  pagination: {
    current_page: number
    per_page: number
    from: number
    to: number
    total: number
  }

  exportLink: string

  checkedCount: { withKey: number; all: number }

  groupDeleteModal: {
    open: boolean
    studentIds: number[]
  }
}

const initialState: StateProps = {
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

  checkedCount: { withKey: 0, all: 0 },

  groupDeleteModal: {
    open: false,
    studentIds: [],
  },
}

export default initialState
