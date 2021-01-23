import React from 'react'
import { useSelector } from 'react-redux'
import { Helmet } from 'react-helmet-async'

import { selectElectionName } from 'features/elections/_id'
import ElectionWithReturn from './_idWithReturn'

interface Props {
  //
}

const ElectionMain: React.FC<Props> = () => {
  const electionName = useSelector(selectElectionName)

  return (
    <>
      <Helmet>
        <title>Dashboard - {electionName}</title>
      </Helmet>

      <ElectionWithReturn />
    </>
  )
}

export default ElectionMain
