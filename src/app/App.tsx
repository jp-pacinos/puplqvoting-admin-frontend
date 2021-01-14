import React, { useEffect } from 'react'

import store from 'app/store'
import { useScrollToTop } from 'common/hooks'
import { fetchSelects } from 'features/app/appSlice'
import { Snackbar } from 'features/snackbar'

import { useResponseInterceptor } from './useResponseInterceptor'

import RouteViews from './Router'
import './App.css'

function App() {
  useScrollToTop()
  useResponseInterceptor()

  useEffect(() => {
    // TODO: init on auth pages
    store.dispatch(fetchSelects())
  }, [])

  return (
    <>
      <RouteViews />

      {/* others */}
      <Snackbar />
    </>
  )
}

export default App
