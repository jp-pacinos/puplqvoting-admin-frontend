import React, { useState } from 'react'

import Modal from './Modal'
import { ModalDeleteElectionProps } from './types'

interface Props extends ModalDeleteElectionProps {
  children: (params: { openModal: () => void }) => React.ReactNode
}

const ModalDeleteElection: React.FC<Props> = ({ children, ...rest }) => {
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

export default ModalDeleteElection
