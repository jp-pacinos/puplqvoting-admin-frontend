import React, { lazy, Suspense } from 'react'
import { useSelector } from 'react-redux'

import { selectIsAuth } from 'features/app/appSlice'
import PagePreloader from 'common/components/PagePreloader'

const RouteAuth = lazy(() => import('./RouteAuth'))
const RouteGuest = lazy(() => import('./RouteGuest'))

const Router: React.FC<{}> = () => {
  const isAuth = useSelector(selectIsAuth)
  return <Suspense fallback={<PagePreloader />}>{isAuth ? <RouteAuth /> : <RouteGuest />}</Suspense>
}

export default Router
