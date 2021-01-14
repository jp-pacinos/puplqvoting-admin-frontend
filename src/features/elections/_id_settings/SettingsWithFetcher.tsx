import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'

import { AppDispatch } from 'app/store'
import { Models } from 'api/types'
import { setElection, fetchSettings } from 'features/elections/_id_settings'

import Settings from './Settings'

interface Props {}

const SettingsWithFetcher: React.FC<Props> = () => {
  const location = useLocation<{ election?: Models.Session.Fields }>()
  const params = useParams<{ id: string }>()
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (location.state && location.state.election) {
      dispatch(setElection(location.state.election))
    }

    const promise = dispatch(fetchSettings({ id: parseInt(params.id) }))

    return () => {
      promise.abort()
    }
  }, [dispatch, location.state, params.id])

  return (
    <>
      <Settings />
    </>
  )
}

export default SettingsWithFetcher
