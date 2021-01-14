import React, { useState } from 'react'
import { useDispatch, useSelector, batch } from 'react-redux'

import { selectElection, unselectElection } from 'api/elections'
import { snackbarOpen } from 'features/snackbar'
import {
  electionSelected,
  electionUnselected,
  selectActiveElection,
} from 'features/elections/index/slice'

type Params = {
  makeSelected: (selected: boolean) => void
  loading: boolean
}

interface Props {
  id: number
  children: (params: Params) => React.ReactNode
}

const SelectElection: React.FC<Props> = ({ id, children }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const activeElection = useSelector(selectActiveElection)

  const dispatch = useDispatch()

  // const makeSelected = (selected: boolean) => {
  //   let fn = selected ? selectElection : unselectElection

  //   setLoading(true)

  //   fn(id)
  //     .then((response) => {
  //       setLoading(false)

  //       batch(() => {
  //         dispatch(
  //           snackbarOpen({
  //             text: response.data.message,
  //             duration: 2250,
  //             position: { x: 'left', y: 'bottom' },
  //           })
  //         )

  //         if (selected) {
  //           dispatch(electionSelected({ id }))
  //         } else {
  //           dispatch(electionUnselected({ id }))
  //         }
  //       })
  //     })
  //     .catch(() => {
  //       setLoading(false)
  //     })
  // }

  const makeSelected = (selected: boolean) => {
    let fn = selected ? selectElection : unselectElection

    setLoading(true)
    fn(id).catch(() => {
      setLoading(false)
      if (activeElection && activeElection.id === id) dispatch(electionUnselected({ id }))
    })

    // make updates now
    batch(() => {
      if (selected && activeElection) return // 'Please unselect the current election.'

      setLoading(false)

      let message = selected ? 'Election selected.' : 'Election unselected.'
      let snackbar = {
        text: message,
        duration: 2250,
        position: { x: 'left', y: 'bottom' } as const,
      }

      dispatch(snackbarOpen(snackbar))

      selected ? dispatch(electionSelected({ id })) : dispatch(electionUnselected({ id }))
    })
  }

  return <>{children({ makeSelected, loading })}</>
}

export default SelectElection
