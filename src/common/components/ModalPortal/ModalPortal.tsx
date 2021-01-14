import React from 'react'
import { createPortal } from 'react-dom'

const modalRoot = document.getElementById('modal-root')!

interface Props {
  //
}

const ModalPortal: React.FC<Props> = ({ children }) => {
  return createPortal(children, modalRoot)
}

export default ModalPortal
