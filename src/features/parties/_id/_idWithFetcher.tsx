import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router'

import { Party as PartyModel } from 'api/types/Models'

import { AppDispatch } from 'app/store'
import { fetchParty, setParty } from './slice'
import PartyPage from './_id'

const PartyWithFetcher: React.FC<{}> = () => {
  const location = useLocation<{ data?: PartyModel.Fields }>()
  const params = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (location.state && location.state.data) {
      dispatch(setParty(location.state.data))
    }

    const promise = dispatch(fetchParty({ id: params.id }))

    return () => {
      promise.abort()
    }
  }, [dispatch, location.state, params.id])

  return (
    <>
      <PartyPage />
    </>
  )
}

export default PartyWithFetcher
