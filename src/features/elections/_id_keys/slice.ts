import { createSlice } from '@reduxjs/toolkit'

const electionKeysSlice = createSlice({
  name: 'electionKeys',
  initialState: {},
  reducers: {
    test() {
      //
    },
  },
})

export default electionKeysSlice

export const reducer = electionKeysSlice.reducer

export const { test } = electionKeysSlice.actions
