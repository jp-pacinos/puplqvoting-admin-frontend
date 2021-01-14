import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { fetchElection, fetchStudentVotes, fetchStreamStats } from './actionsAsync'
import { officialsAdapter } from './adapters'
import initialState, { StateProps } from './initialState'

const slice = createSlice({
  name: 'election',
  initialState,
  reducers: {
    setElection(state, action: PayloadAction<StateProps['election']>) {
      state.election = action.payload
    },

    setStudentVoteChartFilters(
      state,
      action: PayloadAction<StateProps['charts']['studentVotes']['filters']>
    ) {
      state.charts.studentVotes.filters = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchElection.pending, (state) => {
      state.status = 'pending'

      state.parties = initialState.parties
      state.officials = initialState.officials
      state.basicStats = initialState.basicStats
      state.summary = initialState.summary
      state.charts = initialState.charts
      state.reports = initialState.reports
    })

    builder.addCase(fetchElection.fulfilled, (state, action) => {
      state.status = 'success'

      state.election = action.payload.election
      state.parties = action.payload.parties
      officialsAdapter.setAll(state.officials, action.payload.officials)

      state.basicStats = action.payload.stats.basic
      state.summary = action.payload.stats.votes
      state.charts.studentVotes.data = action.payload.stats.votes
      state.reports.election = action.payload.reports.election
    })

    builder.addCase(fetchStudentVotes.pending, (state) => {
      state.charts.studentVotes.status = 'pending'
    })

    builder.addCase(fetchStudentVotes.fulfilled, (state, action) => {
      state.charts.studentVotes.status = 'success'
      state.charts.studentVotes.data = action.payload
    })

    builder.addCase(fetchStreamStats.fulfilled, (state, action) => {
      state.basicStats = action.payload.basic
      state.summary = action.payload.summary
      state.charts.studentVotes.data = action.payload.votes
    })
  },
})

export default slice

export const reducer = slice.reducer

export const { setElection, setStudentVoteChartFilters } = slice.actions
