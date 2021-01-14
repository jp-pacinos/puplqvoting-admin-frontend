import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { updateElectionStatus } from 'api/elections'
import { snackbarOpen } from 'features/snackbar'
import { Select } from 'common/components/Core'
import { selectElection, setElection } from 'features/elections/_id_settings'
import {
  Container,
  DetailsContainer,
  FormContainer,
  FormBody,
  FormFooter,
  Label,
} from './components'
import { useSelector } from 'react-redux'

type Values = '1' | '2' | '3'

const items = [
  { text: 'Not yet', value: '3' as Values },
  { text: 'Completed', value: '1' as Values },
  { text: 'Cancelled', value: '2' as Values },
]

interface Props {}

const ElectionStatus: React.FC<Props> = () => {
  const [status, setStatus] = useState<Values | ''>('')
  const [loading, setLoading] = useState(false)

  const election = useSelector(selectElection)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!election) return

    if (election.completed_at) {
      setStatus('1')
      return
    }

    if (election.cancelled_at) {
      setStatus('2')
      return
    }

    setStatus('3')
  }, [election])

  const handleSubmitStatus = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!election) return

    setLoading(true)

    try {
      const response = await updateElectionStatus({
        id: election.id,
        data: { status },
      })

      dispatch(
        setElection({
          ...election,
          ...response.data.session,
        })
      )

      dispatch(
        snackbarOpen({
          text: 'Election status updated.',
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
        title="Election Completion"
        details="Make the Election finished. Update the election status to completed or cancelled or not yet."
      />
      <FormContainer onSubmit={handleSubmitStatus}>
        <FormBody>
          <Label htmlFor="status" required>
            Election Status
          </Label>
          <Select
            id="status"
            name="status"
            items={items}
            placeholder="Select Election Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as Values)}
            required
          />
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

export default ElectionStatus
