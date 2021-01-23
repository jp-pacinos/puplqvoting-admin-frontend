import React from 'react'
import styles from './Pageloader.module.css'

interface Props {}

const PagePreloader: React.FC<Props> = () => {
  return (
    <div className={styles.container}>
      <div className={styles.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default PagePreloader
