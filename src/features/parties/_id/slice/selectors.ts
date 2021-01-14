import { RootState } from 'app/store'
import { officialsAdapter, addOfficialsAdapter } from './adapters'

export const selectParty = (state: RootState) => state.parties.partyPage.party

export const selectPartyId = (state: RootState) => state.parties.partyPage.party.id

/**
 * officials table
 */

export const {
  selectAll: selectOfficials,
  selectIds: selectOfficialIds,
  selectEntities: selectOfficialEntities,
  selectById: selectOfficialById,
} = officialsAdapter.getSelectors((state: RootState) => state.parties.partyPage.officials)

export const selectResponseStatus = (state: RootState) => state.parties.partyPage.status

/**
 * search
 */

export const {
  selectIds: selectStudentIds,
  selectById: selectStudentById,
} = addOfficialsAdapter.getSelectors((state: RootState) => state.parties.partyPage.search.students)

export const selectSearchStatus = (state: RootState) => state.parties.partyPage.search.status

export const selectSearchPagination = (state: RootState) =>
  state.parties.partyPage.search.pagination

/**
 * official's picture modal
 */

export const selectOfficialModalAddPicture = (state: RootState) =>
  state.parties.partyPage.modalAddPicture
