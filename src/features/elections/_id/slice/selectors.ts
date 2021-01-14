import { createSelector } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

import { officialsAdapter } from './adapters'

export const selectElection = (state: RootState) => state.election.electionPage.election

export const selectElectionIsEnded = createSelector(selectElection, (election) => {
  if (!election) return false
  if (election.started_at) return false
  if (election.completed_at || election.cancelled_at) return true
  return false
})

export const selectElectionResultsLink = (state: RootState) =>
  state.election.electionPage.reports.election

export const selectParties = (state: RootState) => state.election.electionPage.parties

export const {
  selectAll: selectOfficials,
  selectEntities: selectOfficialEntities,
  selectById: selectOfficialById,
} = officialsAdapter.getSelectors((state: RootState) => state.election.electionPage.officials)

export const selectBasicStats = (state: RootState) => state.election.electionPage.basicStats

export const selectStudentVotes = (state: RootState) =>
  state.election.electionPage.charts.studentVotes
export const selectStudentVotesFilters = (state: RootState) =>
  state.election.electionPage.charts.studentVotes.filters

export const selectSummary = (state: RootState) => state.election.electionPage.summary

//

export const selectPartiesOptions = createSelector(selectParties, (parties) => {
  if (!parties) return []

  return parties.map((party) => {
    return {
      text: party.name,
      value: party.id,
    }
  })
})
