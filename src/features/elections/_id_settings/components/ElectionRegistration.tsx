import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import isNumber from 'lodash/isNumber'

import { BooleanNumeric } from 'api/types/Models'
import { updateElectionRegistration } from 'api/elections'
import { SelectYesNo } from 'features/app/components'
import { snackbarOpen } from 'features/snackbar'
import {
  selectRegistration,
  selectElectionId,
  setElectionRegistration,
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

const ElectionRegistration: React.FC<Props> = () => {
  const [registration, setRegistration] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const _id = useSelector(selectElectionId)
  const _registration = useSelector(selectRegistration)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isNumber(_registration)) {
      setRegistration(_registration.toString())
    }
  }, [_registration])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!_id) return

    setLoading(true)
    try {
      const response = await updateElectionRegistration({
        id: _id,
        data: { registration: registration as BooleanNumeric },
      })

      dispatch(setElectionRegistration(response.data.session))

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
      setLoading(false)
    }
  }

  return (
    <Container>
      <DetailsContainer
        title="Election with Registration"
        details="Require the students to register before able to vote. It will help to count the students that are participating in this election."
      >
        <p className="text-sm text-gray-600 mt-1">
          Note: The students that are denied {'(blocked)'} will not able to register.
        </p>
        <p className="text-sm text-gray-600">
          Tip: Allowing registration will not undo the students that are already voted.
        </p>
      </DetailsContainer>
      <FormContainer onSubmit={handleSubmit}>
        <FormBody>
          <div>
            <Label htmlFor="registration" required>
              Registration
            </Label>
            <SelectYesNo
              id="registration"
              name="registration"
              placeholder="Select Registration"
              value={registration.toString()}
              onChange={(e) => setRegistration(e.target.value)}
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

export default ElectionRegistration
