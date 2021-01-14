import React, { useState } from 'react'

import Modal from './Modal'
import { ModalAddElectionProps } from './types'

interface Props extends ModalAddElectionProps {
  children: (params: { openModal: () => void }) => React.ReactNode
}

const ModalAddElection: React.FC<Props> = ({ children, ...rest }) => {
  const [openModal, setOpenModal] = useState(false)

  const onClickModal = () => {
    setOpenModal(true)
  }

  return (
    <>
      {children({ openModal: onClickModal })}

      <Modal
        {...rest}
        {...{
          useOpenModal: [openModal, setOpenModal],
        }}
      />
    </>
  )
}

export default ModalAddElection
