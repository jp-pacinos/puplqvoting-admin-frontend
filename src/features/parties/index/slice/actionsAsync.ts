import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiFunction, getParties } from 'api/parties'

export const fetchParties = createAsyncThunk(
  'parties/fetchParties',
  async (props: ApiFunction.getPartiesParams, { signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })

    const response = await getParties({
      ...props,
      options: {
        ...props.options,
        cancelToken: source.token,
      },
    })

    return response.data
  }
)
