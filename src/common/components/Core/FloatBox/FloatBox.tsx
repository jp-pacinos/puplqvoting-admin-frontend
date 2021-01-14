import React, { useMemo, useEffect } from 'react'

import FadeGrow from 'common/components/Transitions/FadeGrow'
import { FloatBoxProps, PositionProps } from './types'

const baseClassName = (position: PositionProps) => {
  let rootClass = ''
  rootClass += position.x === 'middle' ? ' floatbox__middle__x' : ''
  rootClass += position.x === 'left' ? ' left-0 ml-8' : ''
  rootClass += position.x === 'right' ? ' right-0 mr-8' : ''
  rootClass += position.x === 'top' ? ' top-0 mt-8' : ''
  rootClass += position.x === 'bottom' ? ' bottom-0 mb-8' : ''

  rootClass += position.y === 'middle' ? ' floatbox__middle__y' : ''
  rootClass += position.y === 'left' ? ' left-0 ml-8' : ''
  rootClass += position.y === 'right' ? ' right-0 mr-8' : ''
  rootClass += position.y === 'top' ? ' top-0 mt-8' : ''
  rootClass += position.y === 'bottom' ? ' bottom-0 mb-8' : ''

  rootClass = position.x === 'middle' && position.y === 'middle' ? ' floatbox__middle' : rootClass

  return `floatbox${rootClass}`
}

const FloatBox: React.FC<FloatBoxProps> = ({
  open,
  children,
  duration = 0,
  position = { x: 'middle', y: 'bottom' },
  onClose,
  className,
  ...rest
}) => {
  const rootClassName = useMemo(
    () => `${baseClassName(position)}${className ? ` ${className}` : ''}`,
    [className, position]
  )

  useEffect(() => {
    if (duration === 0) return

    let timerId = setTimeout(() => {
      onClose()
    }, duration)

    return () => {
      clearInterval(timerId)
    }
  }, [duration, onClose])

  return (
    <FadeGrow
      in={open}
      renderComponent={(nodeRef) => (
        <div ref={nodeRef} className={rootClassName} {...rest}>
          {children}
        </div>
      )}
    />
  )
}

export default FloatBox
