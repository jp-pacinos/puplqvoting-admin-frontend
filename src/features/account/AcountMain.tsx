import React, { lazy, Suspense } from 'react'
import { Helmet } from 'react-helmet-async'

import { PagePreloader } from 'common/components'

const Account = lazy(() => import('./Account'))

interface Props {}

const AcountMain: React.FC<Props> = () => {
  return (
    <>
      <Helmet>
        <title>Account</title>
      </Helmet>

      <Suspense fallback={<PagePreloader />}>
        <Account />
      </Suspense>
    </>
  )
}

export default AcountMain
