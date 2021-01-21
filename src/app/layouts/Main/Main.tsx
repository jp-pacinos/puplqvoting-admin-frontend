import React from 'react'
import { Header } from './components'

interface Props {}

const Main: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <AppSpacer />
      <AppContainer>{children}</AppContainer>
    </>
  )
}

export default Main

//

const AppSpacer: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div className="h-16" {...props} />
}

const AppContainer: React.FC<React.ComponentPropsWithoutRef<'div'>> = (props) => {
  return <div className="container mx-auto mb-24 lg:w-4/6 px-3 lg:px-0" {...props} />
}
