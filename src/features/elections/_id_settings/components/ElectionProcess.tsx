import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Session } from 'api/types/Models'
import { updateElectionVerificationType } from 'api/elections'
import { SelectVerificationType } from 'features/app/components'
import { snackbarOpen } from 'features/snackbar'
import {
  selectVerificationType,
  selectElectionId,
  setElectionVerificationType,
} from 'features/elections/_id_settings'

import {
  Container,
  DetailsContainer,
  FormContainer,
  FormBody,
  FormFooter,
  Label,
} from './components'

interface Props {}

const ElectionProcess: React.FC<Props> = () => {
  const [verification, setVerification] = useState<Session.Fillable['verification_type']>('' as any)
  const [loading, setLaoding] = useState(false)

  const _id = useSelector(selectElectionId)
  const _verification = useSelector(selectVerificationType)

  const dispatch = useDispatch()

  useEffect(() => {
    if (_verification) setVerification(_verification)
  }, [_verification])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!_id) return

    setLaoding(true)

    try {
      const response = await updateElectionVerificationType({
        id: _id,
        data: {
          verificationType: verification,
        },
      })

      dispatch(
        setElectionVerificationType({
          verification_type: response.data.verification_type,
        })
      )
      dispatch(
        snackbarOpen({
          text: response.data.message,
          duration: 5000,
          position: { x: 'left', y: 'bottom' },
        })
      )
    } catch (e) {
      //
    } finally {
      setLaoding(false)
    }
  }

  return (
    <Container>
      <DetailsContainer title="Election Verification Process">
        <p className="text-sm text-gray-600 mb-1">
          Update Verification Type for the vote process to be completed,{' '}
          <span className="italic">email</span> only works online and{' '}
          <span className="italic">code</span> work for both online and offline,{' '}
          <span className="italic">open</span> for no validation.
        </p>
        <p className="text-sm text-gray-600">
          It is recommended that you don't change this settings when election is started to avoid
          unexpected change or errors.
        </p>
      </DetailsContainer>
      <FormContainer onSubmit={handleSubmit}>
        <FormBody>
          <div>
            <Label htmlFor="verification" required>
              Verification type
            </Label>
            <SelectVerificationType
              id="verification"
              name="verification"
              placeholder="Select Verification Type"
              value={verification}
              onChange={(e) => setVerification(e.target.value as any)}
              required
            />
          </div>
        </FormBody>

        <FormFooter>
          <button type="submit" className="btn btn-blue btn-lg" disabled={loading}>
            Save
          </button>
        </FormFooter>
      </FormContainer>
    </Container>
  )
}

export default ElectionProcess
