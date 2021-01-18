import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { getStudentKeys, ApiFunction } from 'api/elections'

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
