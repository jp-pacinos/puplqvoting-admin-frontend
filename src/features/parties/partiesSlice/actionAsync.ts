import { createAsyncThunk } from '@reduxjs/toolkit'

import { snackbarOpen } from 'features/snackbar'
import { Duration } from 'common/constants'
import {
  ApiFunction,
  ApiResponse,
  addParty as addPartyApi,
  updateParty as updatepartyApi,
  deleteParty as deletePartyApi,
} from 'api/parties'

export const addParty = createAsyncThunk(
  'parties/addParty',
  async (props: ApiFunction.addPartyParams, { rejectWithValue, dispatch }) => {
    try {
      const response = await addPartyApi(props)

      dispatch(
        snackbarOpen({
          text: `Party added.`,
          position: { x: 'left', y: 'bottom' },
          duration: Duration.short,
        })
      )

      return response.data
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data) // laravel validation
      }

      throw e
    }
  }
)

export const updateParty = createAsyncThunk<ApiResponse.updateParty, ApiFunction.updatePartyParams>(
  'parties/updateParty',
  async (props, { rejectWithValue, dispatch }) => {
    try {
      const response = await updatepartyApi(props)

      dispatch(
        snackbarOpen({
          text: `Party ${response.data.party.name} updated.`,
          position: { x: 'left', y: 'bottom' },
          duration: Duration.short,
        })
      )

      return response.data
    } catch (e) {
      if (e.response) {
        return rejectWithValue(e.response.data) // laravel validation
      }

      throw e
    }
  }
)

export const deleteParty = createAsyncThunk<ApiResponse.deleteParty, ApiFunction.deletePartyParams>(
  'parties/deleteParty',
  async (props, { dispatch }) => {
    dispatch(snackbarOpen({ text: 'Party removed.', duration: Duration.short }))

    const response = await deletePartyApi(props)
    return response.data
  }
)
