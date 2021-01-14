import React, { useState } from 'react'
import { useDispatch, batch } from 'react-redux'

import { startElection, stopElection } from 'api/elections'
import { snackbarOpen } from 'features/snackbar'
import { electionStarted, electionStopped } from 'features/elections/index/slice'

type Params = {
  makeStarted: (selected: boolean) => void
  loading: boolean
}

interface Props {
  id: number
  children: (params: Params) => React.ReactNode
}

const StartElection: React.FC<Props> = ({ id, children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch()

  const makeStarted = (started: boolean) => {
    let fn = started ? startElection : stopElection

    setLoading(true)

    fn(id)
      .then(({ data }) => {
        setLoading(false)

        batch(() => {
          dispatch(
            snackbarOpen({
              text: data.message,
              duration: 2250,
              position: { x: 'left', y: 'bottom' },
            })
          )

          if (started) {
            dispatch(electionStarted({ id, startedAt: data.started_at }))
          } else {
            dispatch(electionStopped({ id }))
          }
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return <>{children({ loading, makeStarted })}</>
}

export default StartElection
