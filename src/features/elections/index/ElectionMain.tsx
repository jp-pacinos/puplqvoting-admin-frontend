import React from 'react'
import { Helmet } from 'react-helmet-async'

import ElectionWithFetcher from './ElectionWithFetcher'

interface Props {}

const ElectionMain: React.FC<Props> = () => {
  return (
    <>
      <Helmet>
        <title>Elections</title>
      </Helmet>

      <ElectionWithFetcher />
    </>
  )
}

export default ElectionMain
