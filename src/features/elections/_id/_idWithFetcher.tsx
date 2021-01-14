import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

import { Models } from 'api/types'
import { AppDispatch } from 'app/store'
import { setElection, fetchElection } from 'features/elections/_id'

import Election from './_id'

interface Props {}

const ElectionWithFetcher: React.FC<Props> = () => {
  const location = useLocation<{ data?: Models.Session.Fields }>()
  const params = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (location.state && location.state.data) {
      dispatch(setElection(location.state.data))
    }

    const promise = dispatch(fetchElection({ id: parseInt(params.id) }))

    return () => {
      promise.abort()
    }
  }, [dispatch, location.state, params.id])

  return (
    <>
      <Election />
    </>
  )
}

export default ElectionWithFetcher
