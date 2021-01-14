import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { AiOutlineEdit, AiOutlineClockCircle } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'

import { Party as PartyModel } from 'api/types/Models'
import { Paragraph } from 'common/components'
import { selectParty, setParty } from 'features/parties/_id'

import { PartyEdit, PartyDelete } from 'features/parties/components'

const emptyDescription = 'No description.'

interface Props {
  //
}

const PartyHeader: React.FC<Props> = () => {
  const location = useLocation<{ data?: PartyModel.Fields }>()
  const history = useHistory()

  const party = useSelector(selectParty)
  const dispatch = useDispatch()

  const handleDeleteSuccess = () => {
    if (location.state) {
      history.goBack()
      return
    }
    history.push('/parties')
  }

  const handleEditSuccess = (newParty: PartyModel.Fields) => {
    dispatch(setParty(newParty))
  }

  if (!party) {
    return null
  }

  let description: string = party.description === null ? emptyDescription : party.description
  description = party.description?.length !== 0 ? description : emptyDescription

  return (
    <div className="card p-5 lg:p-8">
      <div className="flex flex-wrap items-baseline mb-3">
        <h1 className="font-bold text-gray-700 text-2xl mr-3">{party.name ?? 'Party'}</h1>

        <div>
          <PartyEdit party={party} onSuccess={handleEditSuccess}>
            {({ openModal }) => (
              <button onClick={openModal} className="btn btn-blue-link px-0 mr-3">
                <AiOutlineEdit className="inline mb-1" /> Edit
              </button>
            )}
          </PartyEdit>

          <PartyDelete id={party.id} name={party.name} onSuccess={handleDeleteSuccess}>
            {({ openModal }) => (
              <button onClick={openModal} className="btn btn-red-link px-0 mr-3">
                <HiOutlineTrash className="inline mb-1" /> Delete
              </button>
            )}
          </PartyDelete>

          <p className="text-gray-500 inline-block">
            <AiOutlineClockCircle className="inline mb-1" /> {party.created_at ?? 'Unknown'}
          </p>
        </div>
      </div>

      <Paragraph text={description} truncate={520} className="inline leading-relaxed" />
    </div>
  )
}

export default PartyHeader
