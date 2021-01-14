import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { getAll as getSelects } from 'api/selects'

export const fetchSelects = createAsyncThunk('app/fetchSelects', async (_, { signal }) => {
  const source = axios.CancelToken.source()

  signal.addEventListener('abort', () => {
    source.cancel()
  })

  let response = await getSelects({ cancelToken: source.token })

  return response.data
})
