import React from 'react'
import { useDispatch, batch } from 'react-redux'

import { Models } from 'api/types'
import { snackbarOpen } from 'features/snackbar'
import { sessionAdded } from 'features/app/appSlice'
import { electionAdded } from 'features/elections/index/slice'
import { ModalAddElection } from 'features/elections/components'

interface Props {}

const ButtonElectionAdd: React.FC<Props> = () => {
  const dispatch = useDispatch()

  const handleSubmitSuccess = (election: Models.Session.Fields) => {
    batch(() => {
      dispatch(electionAdded(election))

      dispatch(
        snackbarOpen({
          text: `${election.name} added.`,
          position: { x: 'left', y: 'bottom' },
          duration: 7000,
        })
      )

      dispatch(sessionAdded(election))
    })
  }

  return (
    <ModalAddElection onSuccess={handleSubmitSuccess}>
      {({ openModal }) => (
        <button onClick={openModal} className="btn btn-blue btn-lg font-semibold">
          + New Election
        </button>
      )}
    </ModalAddElection>
  )
}

export default React.memo(ButtonElectionAdd)
