import { EntityState } from '@reduxjs/toolkit'
import { RequestStatus } from 'api/types'
import { Party as PartyModel } from 'api/types/Models'

export interface StateProps extends EntityState<PartyModel.Fields> {
  status: RequestStatus

  pagination: {
    currentPage: number
    perPage: number
    from: number
    to: number
    total: number
  }
}
