import { Laravel, RequestStatus as RequestStatusProps, Models } from 'api/types'

export interface PartyAddProps {
  onSuccess?: (newParty: Models.Party.Fields) => void
  onFail?: (error: any) => void
}

export type Validation = Laravel.Validation.UnprocessableEntity<Models.Party.Fillable>
export type Status = RequestStatusProps | 'validating'
