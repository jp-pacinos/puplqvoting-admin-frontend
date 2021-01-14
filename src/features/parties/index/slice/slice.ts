import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Party } from 'api/types/Models'
import { RequestStatus } from 'common/constants'

import { fetchParties } from './actionsAsync'
import { partiesAdapter } from './adapters'
import initialState from './initialState'

const slice = createSlice({
  name: 'parties',
  initialState: partiesAdapter.getInitialState(initialState),
  reducers: {
    newParty(state, action: PayloadAction<Party.Fields>) {
      partiesAdapter.addOne(state, action.payload)
    },
  },

  extraReducers: (builder) => {
    /**
     * fetch parties
     */
    builder.addCase(fetchParties.pending, (state) => {
      state.status = RequestStatus.pending
    })

    builder.addCase(fetchParties.fulfilled, (state, action) => {
      partiesAdapter.setAll(state, action.payload.data)

      state.pagination.currentPage = action.payload.current_page
      state.pagination.from = action.payload.from
      state.pagination.perPage = action.payload.per_page
      state.pagination.to = action.payload.to
      state.pagination.total = action.payload.total

      state.status = RequestStatus.success
    })

    builder.addCase(fetchParties.rejected, (state) => {
      state.status = RequestStatus.failure
    })
  },
})

export default slice

//

export const { newParty } = slice.actions

export const reducer = slice.reducer
