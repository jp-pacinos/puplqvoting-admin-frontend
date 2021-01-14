import { Models, RequestStatus as RequestStatusProps } from 'api'
import { ApiResponse, ApiFunction } from 'api/elections'
import { RequestStatus } from 'common/constants'

import { officialsAdapter } from './adapters'

export interface StateProps {
  status: RequestStatusProps
  election?: Models.Session.Fields

  parties: ApiResponse.getElection['parties']
  officials: ReturnType<typeof officialsAdapter.getInitialState>

  basicStats: ApiResponse.getElection['stats']['basic']
  summary: ApiResponse.getElection['stats']['votes']

  charts: {
    studentVotes: {
      status: RequestStatusProps
      filters: ApiFunction.getStudentVotesParams['filters']
      data: ApiResponse.getElection['stats']['votes']
    }
  }

  reports: {
    election: string
  }
}

const initialState: StateProps = {
  status: RequestStatus.idle,
  election: undefined,

  parties: [],
  officials: {
    ids: [],
    entities: {},
  },

  basicStats: {
    progress: '0.00%',
    registeredCount: 0,
    votedCount: 0,
    notVotedCount: 0,
  },

  summary: [],

  charts: {
    studentVotes: {
      status: RequestStatus.idle,
      filters: {},
      data: [],
    },
  },

  reports: {
    election: '',
  },
}

export default initialState
