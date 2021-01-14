import React from 'react'

import { Fade } from 'common/components/Transitions'
import {
  ElectionStatus,
  ElectionDetails,
  ElectionRegistration,
  ElectionProcess,
  DangerZone,
} from './components'

interface Props {}

const Settings: React.FC<Props> = () => {
  return (
    <Fade>
      <ElectionStatus />

      <ElectionDetails />

      <ElectionRegistration />

      <ElectionProcess />

      <DangerZone />
    </Fade>
  )
}

export default Settings
