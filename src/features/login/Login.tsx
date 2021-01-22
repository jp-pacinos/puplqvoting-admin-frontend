import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import csrf from 'api/csrf'
import { login } from 'api/auth'
import { userLoggedIn } from 'features/app/appSlice'
import CscLogo from 'assets/images/csclogo.jpg'

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const history = useHistory()

  const dispatch = useDispatch()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setError('')
    setLoading(true)

    csrf()
      .then(() => {
        login({ username, password })
          .then((res) => {
            setLoading(false)
            dispatch(userLoggedIn(res.data))
            history.push('/')
          })
          .catch((e) => {
            let message = 'Something went wrong. Please reresh the page and try again.'
            if (e.response) {
              let status = e.response.status ? e.response.status : 500
              if (status === 404 || status === 403 || status === 401)
                message = e.response.data.message
            }

            setError(message)
            setLoading(false)
          })
      })
      .catch(() => {
        setLoading(false)
        setError('Something went wrong.')
      })
  }

  return (
    <>
      <div className="w-full flex" style={{ height: '88vh' }}>
        <div className="m-auto">
          <div className="px-16 py-8">
            <div className="flex items-center mb-5">
              <img src={CscLogo} alt="csc logo" height="55" width="55" className="mr-3" />
              <h1 className="text-2xl font-light mb-1">CENTRAL STUDENT COUNCIL</h1>
            </div>

            <h2 className="text-blue-500 my-5">Authentication</h2>

            <form method="post" onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="w-full p-3 py-2 border rounded focus:outline-none focus:ring-2"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="w-full p-3 py-2 border rounded focus:outline-none focus:ring-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="mb-5">{error && <p className="text-red-500 text-sm">{error}</p>}</div>
              <div>
                <button
                  type="submit"
                  className={`bg-blue-500 text-white font-medium py-2 px-8 rounded hover:bg-blue-600 transition-colors duration-75 ease-in-out ${
                    loading ? 'opacity-50 select' : ''
                  }`}
                  disabled={loading}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
