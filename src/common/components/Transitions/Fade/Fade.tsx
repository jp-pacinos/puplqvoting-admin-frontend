import React from 'react'
import TransitionFactory, { TransitionProps } from 'common/components/Transitions/Factory'

import styles from './Fade.module.css'

const Fade: React.FC<TransitionProps> = ({ delay = 0, timeout = 250, ...rest }) => {
  return <TransitionFactory classNames={styles} delay={delay} timeout={timeout} {...rest} />
}

export default Fade
