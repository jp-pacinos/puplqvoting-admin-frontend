import { EntityState } from '@reduxjs/toolkit'
import { Models, RequestStatus } from 'api/types'

export type Election = Models.Session.Fields

export interface StateProps extends EntityState<Election> {
  status: RequestStatus

  pagination: {
    currentPage: number
    perPage: number
    from: number
    to: number
    total: number
  }

  selected: {
    election?: Election
  }
}
