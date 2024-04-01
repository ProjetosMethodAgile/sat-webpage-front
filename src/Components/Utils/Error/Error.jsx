import React from 'react'
import styles from './Error.module.css'

const Error = ({error}) => {
  return (
    <section className={styles.ErrorContainer}>
        <span className={styles.Error}>{error}</span>
    </section>
  )
}

export default Error