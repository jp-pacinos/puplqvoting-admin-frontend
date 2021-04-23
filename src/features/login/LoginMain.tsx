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

      <div className="text-center text-gray-700 mb-40">
        <h4 className="text-sm mb-3">Tip: Admin account</h4>
        <p>Username: admin@admin.com</p>
        <p>Password: 1234567890</p>
      </div>
    </>
  )
}

export default LoginMain
