import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

// pages
import { LoginPage } from 'features/login'

interface Props {}

const RouteGuest: React.FC<Props> = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <Redirect to="/login" from="*" />
      </Switch>
    </>
  )
}

export default RouteGuest
