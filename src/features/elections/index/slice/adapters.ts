import { createEntityAdapter } from '@reduxjs/toolkit'
import { Election } from './types'

export const electionsAdapter = createEntityAdapter<Election>({
  selectId: (election) => election.id,
})
