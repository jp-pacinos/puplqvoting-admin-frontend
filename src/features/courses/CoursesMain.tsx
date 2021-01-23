import React from 'react'
import { Helmet } from 'react-helmet-async'

import CoursesWithFetcher from './CoursesWithFetcher'

interface Props {}

const CoursesMain: React.FC<Props> = () => {
  return (
    <>
      <Helmet>
        <title>Courses</title>
      </Helmet>

      <CoursesWithFetcher />
    </>
  )
}

export default CoursesMain
