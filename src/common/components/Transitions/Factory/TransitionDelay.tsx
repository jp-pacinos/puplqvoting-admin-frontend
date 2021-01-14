import React, { useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import { TransitionWithDelayProps } from './types'

const TransitionWithDelay: React.FC<TransitionWithDelayProps> = ({
  delay,
  in: parentInProp = true,
  ...rest
}) => {
  const [inProp, setInProp] = useState(false)

  useEffect(() => {
    let timerId = setTimeout(() => {
      setInProp(parentInProp)
    }, delay)

    return () => {
      clearInterval(timerId)
    }
  }, [delay, parentInProp])

  return <CSSTransition in={inProp} {...rest} />
}

export default TransitionWithDelay
