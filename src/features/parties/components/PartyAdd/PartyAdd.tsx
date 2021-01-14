import React, { useState } from 'react'

import PartyAddModal from './PartyAddModal'
import { PartyAddProps } from './types'

interface Props extends PartyAddProps {
  children: (props: { openModal: () => void }) => React.ReactNode
}

const PartyAdd: React.FC<Props> = ({ children, ...rest }) => {
  const [openModal, setOpenModal] = useState(false)

  const handleClickModal = () => {
    setOpenModal(true)
  }

  return (
    <>
      {children({ openModal: handleClickModal })}

      <PartyAddModal {...{ useOpenModal: () => [openModal, setOpenModal] }} {...rest} />
    </>
  )
}

export default PartyAdd
