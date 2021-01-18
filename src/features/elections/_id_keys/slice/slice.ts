import { createSlice } from '@reduxjs/toolkit'
import { RequestStatus } from 'common/constants'
import { fetchStudentKeys } from './actionsAsync'
import { studentKeysAdapter } from './adapters'
import initialState from './initialState'

const electionKeysSlice = createSlice({
  name: 'electionKeys',
  initialState,
  reducers: {
    test() {
      //
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudentKeys.pending, (state) => {
      state.checkedCount = initialState.checkedCount
      state.status = RequestStatus.pending
    })

    builder.addCase(fetchStudentKeys.fulfilled, (state, action) => {
      state.status = RequestStatus.success
      studentKeysAdapter.setAll(state, action.payload.data)

      state.pagination.current_page = action.payload.current_page
      state.pagination.per_page = action.payload.per_page
      state.pagination.from = action.payload.from
      state.pagination.to = action.payload.to
      state.pagination.total = action.payload.total
    })

    builder.addCase(fetchStudentKeys.rejected, (state, action) => {
      if (action.meta.aborted) return
      state.status = RequestStatus.failure
    })
  },
})

export default electionKeysSlice

export const reducer = electionKeysSlice.reducer

export const { test } = electionKeysSlice.actions
