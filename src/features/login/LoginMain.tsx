import React from 'react'
import { Helmet } from 'react-helmet-async'

import Login from './Login'

interface Props {}

const LoginMain: React.FC<Props> = () => {
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      <Login />
    </>
  )
}

export default LoginMain
