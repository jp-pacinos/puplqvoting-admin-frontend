import { $CombinedState } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import { studentKeysAdapter } from './adapters'

export const {
  selectIds: selectStudentKeyIds,
  selectById: selectStudentKeyById,
} = studentKeysAdapter.getSelectors((state: RootState) => state.election.electionKeysPage)
