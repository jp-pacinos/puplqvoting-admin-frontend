import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'

import { selectElectionName } from 'features/elections/_id_settings'
import SettingsWithReturn from './SettingsWithReturn'

interface Props {}

const SettingsMain: React.FC<Props> = () => {
  const electionName = useSelector(selectElectionName)

  return (
    <>
      <Helmet>
        <title>Settings - {electionName}</title>
      </Helmet>

      <SettingsWithReturn />
    </>
  )
}

export default SettingsMain
