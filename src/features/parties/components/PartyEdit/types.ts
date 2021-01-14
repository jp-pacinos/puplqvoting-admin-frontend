import { Party } from 'api/types/Models'

export interface PartyEditProps {
  party: Party.Fields
  onSuccess?: (newParty: Party.Fields) => void
  onFail?: (e: any) => void
}
