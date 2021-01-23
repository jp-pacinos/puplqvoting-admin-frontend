import React from 'react'
import { Helmet } from 'react-helmet-async'

import KeysWithReturn from './KeysWithReturn'

interface Props {}

const KeysMain: React.FC<Props> = () => {
  return (
    <>
      <Helmet>
        <title>Student Keys</title>
      </Helmet>

      <KeysWithReturn />
    </>
  )
}

export default KeysMain
