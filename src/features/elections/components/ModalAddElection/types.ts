import { Laravel, RequestStatus, Models } from 'api/types'
import { ApiFunction } from 'api/elections'

export type AllowedFillable = ApiFunction.addElectionParams['data']

export type Status = RequestStatus | 'validating'
export type Validation = Laravel.Validation.UnprocessableEntity<AllowedFillable>

export interface ModalAddElectionProps {
  onSuccess?: (session: Models.Session.Fields) => void
  onFail?: (error: any) => void
}
