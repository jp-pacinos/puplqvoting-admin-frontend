import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { RootState } from 'app/store'
import { Duration, ErrorMessage } from 'common/constants'
import { snackbarOpen } from 'features/snackbar'
import {
  getParty,
  studentsSearch as studentsSearchApi,
  makeOfficial as makeOfficialApi,
  removeOfficial as removeOfficialApi,
  updateOfficialPosition as updateOfficialPositionApi,
  updateOfficialPicture as updateOfficialPictureApi,
  deleteOfficialPicture as deleteOfficialPictureApi,
  ApiFunction,
  ApiResponse,
} from 'api/parties'

export const fetchParty = createAsyncThunk(
  'parties/fetchParty',
  async (props: ApiFunction.getPartyParams, { signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })

    const response = await getParty({
      ...props,
      options: {
        ...props.options,
        cancelToken: source.token,
      },
    })

    return response.data
  }
)

export const studentsSearch = createAsyncThunk(
  'parties/studentsSearch',
  async (props: ApiFunction.studentsSearchParams, { signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })

    const response = await studentsSearchApi({
      ...props,
      options: {
        ...props.options,
        cancelToken: source.token,
      },
    })

    return response.data
  }
)

export const makeOfficial = createAsyncThunk<
  ApiResponse.makeOfficial,
  ApiFunction.makeOfficialParams & { tempId: number | string },
  { state: RootState }
>('parties/makeOfficial', async (props, { getState, dispatch, rejectWithValue }) => {
  let student = getState().parties.partyPage.search.students.entities[props.studentId]

  try {
    dispatch(
      snackbarOpen({
        text: student ? `Student ${student.student_number} added.` : 'Student added.',
        position: { x: 'left', y: 'bottom' },
        duration: Duration.short,
      })
    )

    const response = await makeOfficialApi(props)
    return response.data
  } catch (e) {
    if (e.response) {
      let status = e.response.status
      let allowed = status === 401 || status === 403

      dispatch(
        snackbarOpen({
          text: allowed ? e.response.data.message : ErrorMessage.unknown,
          position: { x: 'left', y: 'bottom' },
          duration: Duration.short,
        })
      )

      return rejectWithValue(e.response.data) // laravel validation
    }

    throw e
  }
})

export const removeOfficial = createAsyncThunk(
  'parties/removeOfficial',
  async (props: ApiFunction.removeOfficialParams, { dispatch }) => {
    dispatch(
      snackbarOpen({
        text: 'Official removed.',
        position: { x: 'left', y: 'bottom' },
        duration: Duration.veryShort,
      })
    )

    const response = await removeOfficialApi(props)
    return response.data
  }
)

export const updateOfficialPosition = createAsyncThunk(
  'parties/updateOfficialPosition',
  async (props: ApiFunction.updateOfficialPositionParams) => {
    const response = await updateOfficialPositionApi(props)
    return response.data
  }
)

export const newOfficialPicture = createAsyncThunk(
  'parties/newOfficialPicture',
  async (props: ApiFunction.updateOfficialPictureParams, { dispatch }) => {
    try {
      const response = await updateOfficialPictureApi(props)

      dispatch(
        snackbarOpen({
          text: 'Photo updated.',
          position: { x: 'left', y: 'bottom' },
          duration: Duration.short,
        })
      )

      return response.data
    } catch (e) {
      let message = 'Please check your uploaded picture.'

      if (e.response && e.response.status === 403) {
        message = e.response.data.message
      }

      dispatch(
        snackbarOpen({
          text: message,
          position: { x: 'middle', y: 'bottom' },
          duration: Duration.short,
        })
      )

      throw e
    }
  }
)

export const deleteOfficialPicture = createAsyncThunk(
  'parties/deleteOfficialPicture',
  async (props: ApiFunction.deleteOfficialPictureParams) => {
    const response = await deleteOfficialPictureApi(props)
    return response.data
  }
)
