import { RootState } from 'app/store'
import { partiesAdapter } from './adapters'

export const {
  selectAll: selectAllParties,
  selectIds: selectPartiesIds,
  selectEntities: selectParties,
  selectById: selectPartyById,
} = partiesAdapter.getSelectors((state: RootState) => state.parties.indexPage)

export const selectResponseStatus = (state: RootState) => state.parties.indexPage.status

export const selectPagination = (state: RootState) => state.parties.indexPage.pagination
