import React from 'react'
import TransitionFactory, { TransitionProps } from 'common/components/Transitions/Factory'

import styles from './SlideRight.module.css'

const SlideRight: React.FC<TransitionProps> = ({ delay = 0, timeout = 200, ...rest }) => {
  return <TransitionFactory classNames={styles} delay={delay} timeout={timeout} {...rest} />
}

export default SlideRight
