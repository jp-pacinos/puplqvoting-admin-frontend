import { RootState } from 'app/store'
import { studentKeysAdapter } from './adapters'

export const selectElectionId = (state: RootState) => state.election.electionKeysPage.electionId

export const {
  selectAll: selectStudentKeys,
  selectIds: selectStudentKeyIds,
  selectById: selectStudentKeyById,
} = studentKeysAdapter.getSelectors((state: RootState) => state.election.electionKeysPage)

export const selectFetchStatus = (state: RootState) => state.election.electionKeysPage.status

export const selectCheckedCount = (state: RootState) => state.election.electionKeysPage.checkedCount

export const selectGroupDeleteModal = (state: RootState) =>
  state.election.electionKeysPage.groupDeleteModal
