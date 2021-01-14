import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import { ParentTransitionProps } from './types'
import TransitionDelay from './TransitionDelay'

const Transition: React.FC<ParentTransitionProps> = ({
  delay = 0,
  children,
  renderComponent = null,
  ...rest
}) => {
  const nodeRef = useRef(null)

  const defaultProps = {
    in: true,
    nodeRef,
    unmountOnExit: true,
    children: renderComponent ? renderComponent(nodeRef) : <div ref={nodeRef}>{children}</div>,
    ...rest,
  }

  if (delay !== 0) {
    return <TransitionDelay delay={delay} {...defaultProps} />
  }

  return <CSSTransition appear {...defaultProps} />
}

export default Transition
