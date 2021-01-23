import React from 'react'
import { Helmet } from 'react-helmet-async'

import StudentsWithModals from './StudentsWithModals'

const StudentsMain: React.FC<{}> = () => {
  return (
    <>
      <Helmet>
        <title>Students</title>
      </Helmet>

      <StudentsWithModals />
    </>
  )
}

export default StudentsMain
