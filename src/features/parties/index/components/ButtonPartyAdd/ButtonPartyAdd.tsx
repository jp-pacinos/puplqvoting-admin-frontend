import React from 'react'
import { useDispatch } from 'react-redux'

import { Models } from 'api/types'
import { PartyAdd } from 'features/parties/components'
import { newParty } from 'features/parties/index/slice'

interface Props {}

const ButtonPartyAdd: React.FC<Props> = () => {
  const dispatch = useDispatch()

  const handleAdd = (party: Models.Party.Fields) => {
    dispatch(newParty(party))
  }

  return (
    <PartyAdd onSuccess={handleAdd}>
      {({ openModal }) => (
        <button onClick={openModal} className="btn btn-blue btn-lg font-semibold">
          + New Party
        </button>
      )}
    </PartyAdd>
  )
}

export default React.memo(ButtonPartyAdd)
