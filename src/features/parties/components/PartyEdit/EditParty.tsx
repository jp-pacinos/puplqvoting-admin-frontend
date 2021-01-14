import React, { useState } from 'react'

import { PartyEditProps } from './types'
import EditModal from './EditPartyModal'

interface Props extends PartyEditProps {
  children: (props: { openModal: () => void }) => React.ReactNode
}

const EditParty: React.FC<Props> = ({ party, children, ...rest }) => {
  const [openModal, setOpenModal] = useState(false)

  const handleClickModal = () => {
    setOpenModal(true)
  }

  return (
    <>
      {children({ openModal: handleClickModal })}

      <EditModal party={party} {...{ useOpenModal: () => [openModal, setOpenModal] }} {...rest} />
    </>
  )
}

export default EditParty
