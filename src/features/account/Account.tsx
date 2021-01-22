import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { updateUser } from 'api/auth'
import { RequestStatus, Laravel, Models } from 'api'
import { Fade } from 'common/components/Transitions'
import {
  Container,
  DetailsContainer,
  FormContainer,
  FormBody,
  FormFooter,
  Label,
} from 'features/elections/_id_settings/components/components'
import { Input } from 'common/components/Core'
import { snackbarOpen } from 'features/snackbar'
import { selectAuth, userLoggedIn } from 'features/app'

export type Validation = Laravel.Validation.UnprocessableEntity<Models.UserAdmin.Fillable>

interface Props {}

const Account: React.FC<Props> = () => {
  const auth = useSelector(selectAuth)

  const [name, setName] = useState<string>(auth.user.name || '')
  const [username, setUsername] = useState<string>(auth.user.email || '')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')

  const [status, setStatus] = useState<RequestStatus | 'validating'>()
  const [validation, setValidation] = useState<Validation>({
    message: '',
    errors: {},
  })

  const dispatch = useDispatch()

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) return false

    setStatus('pending')

    try {
      let response = await updateUser({
        id: auth.user.id as number,
        data: {
          name,
          email: username,
          password,
          confirmPassword,
          oldPassword,
        },
      })

      let updatedUser: typeof auth = {
        ...auth,
        user: response.data.user,
      }

      dispatch(userLoggedIn(updatedUser))
      dispatch(
        snackbarOpen({
          text: 'Account updated succesfully.',
          duration: 5000,
          position: { x: 'left', y: 'bottom' },
        })
      )
      setPassword('')
      setConfirmPassword('')
      setOldPassword('')
      setStatus('success')
    } catch (e) {
      if (e.response) {
        if (e.response.status === 422) {
          setValidation(e.response.data)
          setStatus('validating')
          return
        }
      }
      setStatus('failure')
    }
  }

  const renderValidation = status === 'validating' && (
    <div className="my-3">
      {Object.entries(validation.errors).map(([key, errors]) => {
        if (!errors) return undefined

        return errors.map((requirements, i) => {
          return (
            <p key={`${key}-${i}`} className="text-red-500 font-semibold text-md">
              * {requirements}
            </p>
          )
        })
      })}
    </div>
  )

  return (
    <Fade>
      <h1 className="font-light text-2xl my-5 text-blue-500">My Account</h1>

      <Container>
        <DetailsContainer title="User information" details="Update your username and password." />
        <FormContainer onSubmit={handleUpdate}>
          <FormBody>
            <div className="mb-3">
              <Label htmlFor="user-name" required>
                Name
              </Label>
              <Input
                id="user-name"
                name="user-name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <Label htmlFor="username" required>
                Username
              </Label>
              <Input
                id="username"
                name="username"
                placeholder="Enter account username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <Label htmlFor="password" required>
                New Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Fade in={password.length > 0} className="mb-3">
              <Label htmlFor="confirmpassword" required>
                Confirm password
              </Label>
              <Input
                id="confirmpassword"
                name="confirmpassword"
                type="password"
                placeholder="Enter your password again"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {confirmPassword.length > 0 && password !== confirmPassword && (
                <p className="text-red-500 p-1 text-sm">Passwords don't match.</p>
              )}
            </Fade>

            <Fade
              in={password.length > 0 && confirmPassword.length > 0 && password === confirmPassword}
              className="mb-3"
            >
              <Label htmlFor="confirmpassword" required>
                Enter Old password
              </Label>
              <Input
                id="oldpassword"
                name="oldpassword"
                type="password"
                placeholder="Enter your old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Fade>

            {renderValidation}
          </FormBody>

          <FormFooter>
            <button type="submit" className="btn btn-blue btn-lg" disabled={status === 'pending'}>
              Update
            </button>
          </FormFooter>
        </FormContainer>
      </Container>
    </Fade>
  )
}

export default Account
