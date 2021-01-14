import React from 'react'
import { Header } from './components'

interface Props {
  children: React.ReactNode
}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />

      {/* spacer */}
      <div className="h-16"></div>

      {/* content */}
      <div className="container mx-auto mb-24 lg:w-4/6 px-3 lg:px-0">{children}</div>
    </>
  )
}

export default Main
