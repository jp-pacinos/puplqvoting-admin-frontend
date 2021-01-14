import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { ApiFunction, getActiveElection, getElections } from 'api/elections'

export const fetchActiveElection = createAsyncThunk(
  'elections/fetchActiveElection',
  async (params: ApiFunction.getActiveElectionParams, { signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })

    const response = await getActiveElection({
      config: {
        ...params.config,
        cancelToken: source.token,
      },
    })

    return response.data
  }
)

export const fetchElections = createAsyncThunk(
  'elections/fetchElections',
  async (params: ApiFunction.getElectionsParams, { signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })

    const response = await getElections({
      ...params,
      config: {
        ...params.config,
        cancelToken: source.token,
      },
    })

    return response.data
  }
)
