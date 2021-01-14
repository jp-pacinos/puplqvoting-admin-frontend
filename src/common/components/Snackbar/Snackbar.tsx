import React from 'react'

import FloatBox from 'common/components/Core/FloatBox'
import { SnackbarProps } from './types'

const Snackbar: React.FC<SnackbarProps> = ({
  text,
  open,
  duration = 0,
  onClose,
  className,
  position = { x: 'middle', y: 'bottom' },
  ...rest
}) => {
  return (
    <FloatBox open={open} onClose={onClose} duration={duration} position={position} {...rest}>
      <div className="flex justify-between w-full bg-gray-800 text-white text-center rounded shadow-2xl p-3 z-40">
        <p className="my-auto mr-auto px-2">{text}</p>
        <button
          onClick={onClose}
          className="btn text-red-500 font-semibold hover:text-red-600 focus:outline-none transition-colors duration-75 ease-in-out"
        >
          Close
        </button>
      </div>
    </FloatBox>
  )
}

export default Snackbar
