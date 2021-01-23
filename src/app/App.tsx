import React from 'react'

import { useScrollToTop } from 'common/hooks'
import RouteViews from './router'
import './App.css'

function App() {
  useScrollToTop()

  return (
    <>
      <RouteViews />
    </>
  )
}

export default App
