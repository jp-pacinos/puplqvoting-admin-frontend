import React from 'react'
import { Helmet } from 'react-helmet-async'

import Account from './Account'

interface Props {}

const AcountMain: React.FC<Props> = () => {
  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>

      <Account />
    </>
  )
}

export default AcountMain
