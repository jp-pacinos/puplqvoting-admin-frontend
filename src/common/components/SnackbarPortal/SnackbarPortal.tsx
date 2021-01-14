import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'

const snackbarRoot = document.getElementById('snackbar-root')
const el = document.createElement('div')

interface Props {
  //
}

const SnackbarPortal: React.FC<Props> = ({ children }) => {
  useEffect(() => {
    snackbarRoot?.appendChild(el)
    return () => {
      snackbarRoot?.removeChild(el)
    }
  }, [])

  return createPortal(children, el)
}

export default SnackbarPortal
