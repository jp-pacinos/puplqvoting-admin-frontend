import React from 'react'
import { Helmet } from 'react-helmet-async'

import PartiesWithFetcher from './PartiesWithFetcher'

interface PartiesMainProps {}

const PartiesMain: React.FC<PartiesMainProps> = () => {
  return (
    <>
      <Helmet>
        <title>Parties</title>
      </Helmet>

      <PartiesWithFetcher />
    </>
  )
}

export default PartiesMain
