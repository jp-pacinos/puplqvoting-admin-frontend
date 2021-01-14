import { Election } from 'features/elections/index/slice'

export type StatusProps = 'open' | 'completed' | 'ongoing' | 'cancelled'

export interface getStatusFunction {
  (election: Pick<Election, 'active' | 'started_at' | 'completed_at' | 'cancelled_at'>): StatusProps
}

const getStatus: getStatusFunction = (election) => {
  if (election.completed_at) {
    return 'completed'
  }

  if (election.cancelled_at) {
    return 'cancelled'
  }

  if (election.started_at) {
    return 'ongoing'
  }

  return 'open'
}

export default getStatus
