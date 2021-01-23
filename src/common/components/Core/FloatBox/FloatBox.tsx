import React, { useEffect } from 'react'

import FadeGrow from 'common/components/Transitions/FadeGrow'
import { FloatBoxProps } from './types'
import { getBaseClassName } from './utils'

const FloatBox: React.FC<FloatBoxProps> = ({
  open,
  duration = 0,
  position = { x: 'middle', y: 'bottom' },
  onClose,
  className,
  ...rest
}) => {
  useEffect(() => {
    if (duration === 0) return
    let timerId = setTimeout(() => onClose(), duration)
    return () => clearInterval(timerId)
  }, [duration, onClose])

  return (
    <FadeGrow
      in={open}
      renderComponent={(nodeRef) => (
        <div
          ref={nodeRef}
          className={
            className ? `${getBaseClassName(position)} ${className}` : getBaseClassName(position)
          }
          {...rest}
        />
      )}
    />
  )
}

export default FloatBox
