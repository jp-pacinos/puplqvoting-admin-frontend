import { createSlice, createAsyncThunk, createSelector, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

import { RootState } from 'app/store'
import { Models } from 'api/types'
import { getElectionSettings, ApiFunction } from 'api/elections'

export const fetchSettings = createAsyncThunk(
  'settings/fetchSettings',
  async (params: ApiFunction.getElectionSettingsParams, { signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })

    const response = await getElectionSettings({
      ...params,
      config: {
        ...params.config,
        cancelToken: source.token,
      },
    })

    return response.data
  }
)

interface StateProps {
  election?: Models.Session.Fields
}

const initialState: StateProps = {
  election: undefined,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setElection(state, action: PayloadAction<StateProps['election']>) {
      state.election = action.payload
    },

    setElectionDetails(
      state,
      action: PayloadAction<Pick<Models.Session.Fields, 'name' | 'year' | 'description'>>
    ) {
      if (!state.election) return
      state.election.name = action.payload.name
      state.election.year = action.payload.year
      state.election.description = action.payload.description
    },

    setElectionRegistration(
      state,
      action: PayloadAction<Pick<Models.Session.Fields, 'registration' | 'registration_at'>>
    ) {
      if (!state.election) return
      state.election.registration = action.payload.registration
      state.election.registration_at = action.payload.registration_at
    },

    setElectionVerificationType(
      state,
      action: PayloadAction<Pick<Models.Session.Fields, 'verification_type'>>
    ) {
      if (!state.election) return
      state.election.verification_type = action.payload.verification_type
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSettings.fulfilled, (state, action) => {
      state.election = action.payload
    })
  },
})

export default settingsSlice

export const reducer = settingsSlice.reducer

export const {
  setElection,
  setElectionDetails,
  setElectionRegistration,
  setElectionVerificationType,
} = settingsSlice.actions

// selectors
export const selectElection = (state: RootState) => state.election.electionSettingsPage.election

export const selectElectionName = createSelector(selectElection, (election) => {
  return (election && election.name) || 'Election'
})

export const selectElectionId = (state: RootState) =>
  state.election.electionSettingsPage.election?.id
export const selectName = (state: RootState) => state.election.electionSettingsPage.election?.name
export const selectYear = (state: RootState) => state.election.electionSettingsPage.election?.year
export const selectDescription = (state: RootState) =>
  state.election.electionSettingsPage.election?.description

export const selectRegistration = (state: RootState) =>
  state.election.electionSettingsPage.election?.registration
export const selectVerificationType = (state: RootState) =>
  state.election.electionSettingsPage.election?.verification_type
