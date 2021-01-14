import React, { useState } from 'react'
import { useDispatch, batch } from 'react-redux'

import { startElectionRegistration, stopElectionRegistration } from 'api/elections'
import { snackbarOpen } from 'features/snackbar'
import { registrationStarted, registrationStopped } from 'features/elections/index/slice'

type Params = {
  setRegistration: (start: boolean) => void
  loading: boolean
}

interface Props {
  id: number
  children: (params: Params) => React.ReactNode
}

const StartRegistration: React.FC<Props> = ({ id, children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const dispatch = useDispatch()

  const onSetup = (start: boolean) => {
    let fn = start ? startElectionRegistration : stopElectionRegistration

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

          if (start) {
            dispatch(registrationStarted({ id, startedAt: data.registration_at as string }))
          } else {
            dispatch(registrationStopped({ id }))
          }
        })
      })
      .catch(() => {
        setLoading(false)
      })
  }

  return <>{children({ loading, setRegistration: onSetup })}</>
}

export default StartRegistration
