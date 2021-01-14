import { RequestStatus } from 'api/types'

export type Status = RequestStatus | 'validating'

export interface ModalDeleteElectionProps {
  electionId: number
  electionName: string
  onSuccess?: (data: { message: string }) => void
  onFail?: (error: any) => void
}
