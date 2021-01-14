import React, { useState } from 'react'

import DeleteModal from './PartyDeleteModal'
import { PartyDeleteProps } from './types'

interface Props extends PartyDeleteProps {
  children: (props: { openModal: () => void }) => React.ReactNode
}

const PartyDelete: React.FC<Props> = ({ id, name, children, ...rest }) => {
  const [openModal, setOpenModal] = useState(false)

  const handleClickModal = () => {
    setOpenModal(true)
  }

  return (
    <>
      {children({ openModal: handleClickModal })}

      <DeleteModal
        id={id}
        name={name}
        {...{ useOpenModal: () => [openModal, setOpenModal] }}
        {...rest}
      />
    </>
  )
}

export default PartyDelete
