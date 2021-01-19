import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { snackbarOpen } from 'features/snackbar'
import {
  getStudentKeys,
  addStudentKeysGroup,
  deleteStudentKeysGroup,
  ApiFunction,
} from 'api/elections'

export const fetchStudentKeys = createAsyncThunk(
  'keys/fetchStudentKeys',
  async (params: ApiFunction.getStudentKeysParams, { signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })

    const response = await getStudentKeys({
      ...params,
      config: {
        ...params.config,
        cancelToken: source.token,
      },
    })

    return response.data
  }
)

export const groupGenerateKeys = createAsyncThunk(
  'keys/groupGenerateKeys',
  async (params: ApiFunction.groupActionStudentKeysParams, { dispatch }) => {
    dispatch(
      snackbarOpen({
        text: 'Please wait...',
        duration: 5000,
        position: { x: 'bottom', y: 'left' },
      })
    )

    const response = await addStudentKeysGroup(params)

    dispatch(
      snackbarOpen({
        text: `${params.studentIds.length} ${response.data.message}`,
        duration: 3000,
        position: { x: 'bottom', y: 'left' },
      })
    )

    return response.data
  }
)

export const groupDeleteKeys = createAsyncThunk(
  'keys/groupDeleteKeys',
  async (params: ApiFunction.groupActionStudentKeysParams & { keyIds: number[] }, { dispatch }) => {
    dispatch(
      snackbarOpen({
        text: `${params.studentIds.length} Student keys deleted.`,
        duration: 5000,
        position: { x: 'bottom', y: 'left' },
      })
    )

    const response = await deleteStudentKeysGroup(params)
    return response.data
  }
)
