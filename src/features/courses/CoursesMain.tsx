import React, { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'

import { PagePreloader } from 'common/components'

const CoursesWithFetcher = lazy(() => import('./CoursesWithFetcher'))

interface Props {}

const CoursesMain: React.FC<Props> = () => {
  return (
    <>
      <Helmet>
        <title>Courses</title>
      </Helmet>

      <Suspense fallback={<PagePreloader />}>
        <CoursesWithFetcher />
      </Suspense>
    </>
  )
}

export default CoursesMain
