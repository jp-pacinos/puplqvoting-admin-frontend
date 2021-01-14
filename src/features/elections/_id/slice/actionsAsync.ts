import { RootState } from 'app/store'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import {
  getElection,
  getStudentVotes,
  getStreamStats,
  ApiFunction,
  ApiResponse,
} from 'api/elections'
import { setStudentVoteChartFilters } from './slice'

export const fetchElection = createAsyncThunk(
  'election/fetchElection',
  async (params: ApiFunction.getElectionParams, { signal }) => {
    const source = axios.CancelToken.source()

    signal.addEventListener('abort', () => {
      source.cancel()
    })

    const response = await getElection({
      ...params,
      config: {
        ...params.config,
        cancelToken: source.token,
      },
    })

    return response.data
  }
)

// stats

export const fetchStudentVotes = createAsyncThunk<
  ApiResponse.getStudentVotes,
  Omit<ApiFunction.getStudentVotesParams, 'sessionId'>,
  { state: RootState }
>('election/getStudentVotes', async (params, { signal, getState, dispatch }) => {
  const sessionId = getState().election.electionPage.election?.id
  const source = axios.CancelToken.source()

  dispatch(setStudentVoteChartFilters(params.filters))

  signal.addEventListener('abort', () => {
    source.cancel()
  })

  const response = await getStudentVotes({
    sessionId: sessionId as number,
    filters: params.filters,
    config: {
      ...params.config,
      cancelToken: source.token,
    },
  })

  return response.data
})

// stats - stream
export const fetchStreamStats = createAsyncThunk<
  ApiResponse.getStreamStats,
  Omit<ApiFunction.getStreamStatsParams, 'sessionId'>,
  { state: RootState }
>('election/fetchStreamStats', async (params, { signal, getState }) => {
  const sessionId = getState().election.electionPage.election?.id
  const source = axios.CancelToken.source()

  signal.addEventListener('abort', () => {
    source.cancel()
  })

  const response = await getStreamStats({
    ...params,
    sessionId: sessionId as number,
    config: {
      ...params.config,
      cancelToken: source.token,
    },
  })

  return response.data
})
