import React from 'react'

import CoursesWithFetcher from './CoursesWithFetcher'

interface Props {}

const CoursesMain: React.FC<Props> = () => {
  return (
    <>
      <CoursesWithFetcher />
    </>
  )
}

export default CoursesMain
