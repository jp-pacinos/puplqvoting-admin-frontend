import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'

import { RequestStatus, Laravel, Models } from 'api'
import { updateElectionBasicDetails } from 'api/elections'
import { Input, TextArea } from 'common/components/Core'
import { sessionUpdated } from 'features/app/appSlice'
import {
  selectName,
  selectYear,
  selectDescription,
  selectElectionId,
  setElectionDetails,
} from 'features/elections/_id_settings'
import {
  Container,
  DetailsContainer,
  FormContainer,
  FormBody,
  FormFooter,
  Label,
} from './components'
import { snackbarOpen } from 'features/snackbar'

export type Validation = Laravel.Validation.UnprocessableEntity<
  Pick<Models.Session.Fillable, 'name' | 'year' | 'description'>
>

interface Props {}

const ElectionDetails: React.FC<Props> = () => {
  const [name, setName] = useState('')
  const [year, setYear] = useState(new Date().getFullYear())
  const [description, setDescription] = useState('')

  const [status, setStatus] = useState<RequestStatus | 'validating'>()
  const [validation, setValidation] = useState<Validation>({
    message: '',
    errors: {},
  })

  const _id = useSelector(selectElectionId)
  const _name = useSelector(selectName)
  const _year = useSelector(selectYear)
  const _description = useSelector(selectDescription)

  const dispatch = useDispatch()

  useEffect(() => {
    if (_name) setName(_name)
    if (_year) setYear(_year)
    if (_description) setDescription(_description)
  }, [_description, _name, _year])

  const handleSaveElection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!_id) return

    setStatus('pending')

    try {
      const data = { name, year, description }

      const response = await updateElectionBasicDetails({
        id: _id,
        data,
      })

      batch(() => {
        dispatch(setElectionDetails(data))

        dispatch(
          sessionUpdated({
            id: _id,
            name,
            year,
          })
        )

        dispatch(
          snackbarOpen({
            text: response.data.message,
            duration: 5000,
            position: { x: 'left', y: 'bottom' },
          })
        )
      })

      setStatus('success')
    } catch (e) {
      if (e.response && e.response.status === 422) {
        setValidation(e.response.data)
        setStatus('validating')
        return
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
    <Container>
      <DetailsContainer
        title="Election Details"
        details="Update election name, year and description. It does not affect the entire settings, it is used to
            name and sort elections."
      />
      <FormContainer onSubmit={handleSaveElection}>
        <FormBody>
          <div className="mb-3">
            <Label htmlFor="election" required>
              Election Name
            </Label>
            <Input
              id="election"
              name="election"
              placeholder="Election name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <Label htmlFor="year" required>
              Year
            </Label>
            <Input
              id="year"
              type="number"
              min="1"
              max="9999"
              name="year"
              placeholder="Election Year"
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <TextArea
              id="description"
              placeholder="Election description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>

          {renderValidation}
        </FormBody>

        <FormFooter>
          <button type="submit" className="btn btn-blue btn-lg" disabled={status === 'pending'}>
            Save
          </button>
        </FormFooter>
      </FormContainer>
    </Container>
  )
}

export default ElectionDetails
