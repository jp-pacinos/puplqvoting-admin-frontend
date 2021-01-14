import React from 'react'
import { useSelector, useDispatch, batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { ModalDeleteElection } from 'features/elections/components'
import { sessionDeleted } from 'features/app/appSlice'
import { snackbarOpen } from 'features/snackbar'
import { electionDeleted } from 'features/elections/index/slice'
import { setElection } from 'features/elections/_id_settings'

interface Props {}

const DangerZone: React.FC<Props> = () => {
  const electionId = useSelector((state) => state.election.electionSettingsPage.election?.id)
  const name = useSelector((state) => state.election.electionSettingsPage.election?.name)

  const dispatch = useDispatch()
  const history = useHistory()

  const deleteElection = () => {
    batch(() => {
      dispatch(
        snackbarOpen({
          text: `${name} deleted.`,
          duration: 7000,
          position: { x: 'left', y: 'bottom' },
        })
      )
      dispatch(sessionDeleted({ id: electionId as number }))
      dispatch(electionDeleted({ id: electionId as number }))
      dispatch(setElection(undefined))
    })

    history.push('/elections')
    return
  }

  return (
    <>
      <div className="flex flex-wrap -mx-3 items-center">
        <div className="w-full px-3 mb-3 md:w-2/6 md:mb-0">
          <h2 className="font-bold text-md mb-2 text-red-500">Danger Zone</h2>
          <p className="text-sm text-gray-600 mb-1">Delete this election. This cannot be undone.</p>
          <p className="text-sm text-gray-600">
            This also remove its parties, officials and registered students and keys if have any.
          </p>
        </div>
        <div className="px-3 w-full md:w-4/6">
          <div className="md:px-5">
            <ModalDeleteElection
              electionId={electionId ?? 0}
              electionName={name ?? 'Election'}
              onSuccess={deleteElection}
            >
              {({ openModal }) => {
                return (
                  <button onClick={openModal} className="btn btn-red btn-lg" disabled={!electionId}>
                    Delete this Election
                  </button>
                )
              }}
            </ModalDeleteElection>
          </div>
        </div>
      </div>
    </>
  )
}

export default DangerZone
