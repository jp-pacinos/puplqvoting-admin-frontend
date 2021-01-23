import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'

import { selectPartyName } from './slice'
import PartyWithReturn from './_idWithReturn'

interface Props {}

const PartyMain: React.FC<Props> = () => {
  const partyName = useSelector(selectPartyName)

  return (
    <>
      <Helmet>
        <title>Party - {partyName}</title>
      </Helmet>

      <PartyWithReturn />
    </>
  )
}

export default PartyMain
