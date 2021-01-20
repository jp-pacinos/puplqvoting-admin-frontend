import { createSlice, PayloadAction, EntityId } from '@reduxjs/toolkit'

import { Models } from 'api/types'
import { sessionAdaper, coursesAdapter, positionsAdapter } from './adapters'
import { fetchSelects } from './actionsAsync'
import initialState from './initialState'

const appSlice = createSlice({
  name: 'selects',
  initialState,
  reducers: {
    sessionAdded(state, action: PayloadAction<Models.Session.Fields>) {
      sessionAdaper.addOne(state.sessions, {
        id: action.payload.id,
        name: action.payload.name,
        year: action.payload.year,
        created_at: action.payload.created_at,
      })
    },

    sessionDeleted(state, action: PayloadAction<{ id: EntityId }>) {
      sessionAdaper.removeOne(state.sessions, action.payload.id)
    },

    sessionUpdated(
      state,
      action: PayloadAction<Pick<Models.Session.Fields, 'id' | 'name' | 'year'>>
    ) {
      sessionAdaper.updateOne(state.sessions, {
        id: action.payload.id,
        changes: {
          name: action.payload.name,
          year: action.payload.year,
        },
      })
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSelects.fulfilled, (state, { payload }) => {
      sessionAdaper.setAll(state.sessions, payload.sessions)
      positionsAdapter.setAll(state.positions, payload.positions)
      coursesAdapter.setAll(state.courses, payload.courses)
    })
  },
})

export default appSlice

export const reducer = appSlice.reducer

export const { sessionAdded, sessionDeleted, sessionUpdated } = appSlice.actions
