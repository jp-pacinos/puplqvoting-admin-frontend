import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SnackbarPortal, Snackbar as BaseSnackbar } from 'common/components'
import { snackbarClose } from 'features/snackbar/snackbarSlice'

const Snackbar: React.FC<{}> = () => {
  const snackbar = useSelector((state) => state.snackbar)
  const dispatch = useDispatch()

  const onCloseSnackbar = () => {
    dispatch(snackbarClose())
  }

  return (
    <SnackbarPortal>
      <BaseSnackbar
        open={snackbar.open}
        text={snackbar.text}
        duration={snackbar.duration}
        position={snackbar.position}
        onClose={onCloseSnackbar}
      />
    </SnackbarPortal>
  )
}

export default Snackbar
