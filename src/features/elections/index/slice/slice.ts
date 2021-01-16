import { createSlice, EntityId, PayloadAction } from '@reduxjs/toolkit'

import { Models } from 'api/types'
import { RequestStatus } from 'common/constants'
import { electionsAdapter } from './adapters'
import { fetchActiveElection, fetchElections } from './actionsAsync'
import initialState from './initialState'

const slice = createSlice({
  name: 'elections',
  initialState,
  reducers: {
    electionAdded(state, action: PayloadAction<Models.Session.Fields>) {
      electionsAdapter.addOne(state, action.payload)
      // state.pagination.total++ // if have page details.
    },

    electionSelected(state, action: PayloadAction<{ id: EntityId }>) {
      state.selected = {
        election: state.entities[action.payload.id],
      }

      if (state.selected.election) state.selected.election.active = 1

      electionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          active: 1,
        },
      })
    },

    electionUnselected(state, action: PayloadAction<{ id: EntityId }>) {
      state.selected.election = undefined

      electionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          active: 0,
          started_at: null,
          registration_at: null,
        },
      })
    },

    registrationStarted(state, action: PayloadAction<{ id: EntityId; startedAt: string }>) {
      if (state.selected.election)
        state.selected.election.registration_at = action.payload.startedAt

      electionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          registration_at: action.payload.startedAt,
        },
      })
    },

    registrationStopped(state, action: PayloadAction<{ id: EntityId }>) {
      if (state.selected.election) state.selected.election.registration_at = null

      electionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          registration_at: null,
        },
      })
    },

    electionStarted(state, action: PayloadAction<{ id: EntityId; startedAt: string }>) {
      if (state.selected.election) state.selected.election.started_at = action.payload.startedAt

      electionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          started_at: action.payload.startedAt,
        },
      })
    },

    electionStopped(state, action: PayloadAction<{ id: EntityId }>) {
      if (state.selected.election) state.selected.election.started_at = null

      electionsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          started_at: null,
        },
      })
    },

    electionDeleted(state, action: PayloadAction<{ id: EntityId }>) {
      electionsAdapter.removeOne(state, action.payload.id)
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchActiveElection.pending, (state) => {
      state.selected.election = undefined
    })

    builder.addCase(fetchActiveElection.fulfilled, (state, action) => {
      if (action.payload) {
        state.selected = {
          election: action.payload,
        }
      }
    })

    builder.addCase(fetchElections.pending, (state) => {
      state.status = RequestStatus.pending
    })

    builder.addCase(fetchElections.fulfilled, (state, action) => {
      electionsAdapter.setAll(state, action.payload.data)

      state.pagination.perPage = action.payload.per_page
      state.pagination.from = action.payload.from
      state.pagination.to = action.payload.to
      state.pagination.total = action.payload.total

      state.status = RequestStatus.success
    })

    builder.addCase(fetchElections.rejected, (state, action) => {
      if (action.meta.aborted) return

      state.status = RequestStatus.failure
    })
  },
})

export default slice

export const reducer = slice.reducer

export const {
  electionAdded,
  electionSelected,
  electionUnselected,
  registrationStarted,
  registrationStopped,
  electionStarted,
  electionStopped,
  electionDeleted,
} = slice.actions
