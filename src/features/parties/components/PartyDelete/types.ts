import { EntityId } from '@reduxjs/toolkit'

export interface PartyDeleteProps {
  id: EntityId
  name: string
  onSuccess?: () => void
  onFail?: (error: any) => void
}
