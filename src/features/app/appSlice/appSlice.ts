import { createSlice, PayloadAction, EntityId } from '@reduxjs/toolkit'

import apiClient from 'api/apiClient'
import { Models } from 'api/types'
import { sessionAdaper, coursesAdapter, positionsAdapter } from './adapters'
import { fetchSelects } from './actionsAsync'
import initialState from './initialState'
import { StateProps } from './types'

const appSlice = createSlice({
  name: 'selects',
  initialState,
  reducers: {
    userLoggedIn: {
      reducer(state, action: PayloadAction<StateProps['auth']>) {
        state.auth = action.payload
      },
      prepare(payload: StateProps['auth']) {
        let token = payload && payload.token ? payload.token : ''
        let user = payload && payload.user ? payload.user : {}

        localStorage.setItem('auth-token', token)
        localStorage.setItem('auth-user', JSON.stringify(user))
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`

        return {
          payload: { token, user },
        }
      },
    },

    userLoggedOut: {
      reducer(state) {
        state.auth = initialState.auth
      },
      prepare() {
        localStorage.removeItem('auth-token')
        localStorage.removeItem('auth-user')
        apiClient.defaults.headers.common['Authorization'] = ''

        return { payload: undefined }
      },
    },

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

    courseAdded(state, action: PayloadAction<Models.Course.Fields>) {
      coursesAdapter.addOne(state.courses, action.payload)
    },

    courseUpdated(state, action: PayloadAction<{ id: EntityId; changes: Models.Course.Fillable }>) {
      coursesAdapter.updateOne(state.courses, {
        id: action.payload.id,
        changes: action.payload.changes,
      })
    },

    courseDeleted(state, action: PayloadAction<{ id: EntityId }>) {
      coursesAdapter.removeOne(state.courses, action.payload.id)
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

export const {
  userLoggedIn,
  userLoggedOut,
  sessionAdded,
  sessionDeleted,
  sessionUpdated,
  courseAdded,
  courseUpdated,
  courseDeleted,
} = appSlice.actions
