import { RootState } from 'app/store'
import { electionsAdapter } from './adapters'

export const {
  selectAll: selectElections,
  selectIds: selectElectionIds,
  selectById: selectElectionById,
  selectEntities: selectElectionEntities,
} = electionsAdapter.getSelectors((state: RootState) => state.election.indexPage)

export const selectPagination = (state: RootState) => state.election.indexPage.pagination

export const selectStatus = (state: RootState) => state.election.indexPage.status

export const selectActiveElection = (state: RootState) => state.election.indexPage.selected.election
