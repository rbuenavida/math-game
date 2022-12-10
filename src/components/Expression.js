import React from 'react'
import styles from './Expression.module.css'

const Expression = (props) => {
  const { from, to, transitioning } = props;

  return (
    <div className={`${styles.expression} ${transitioning ? `${styles.transitioning}` : ''}`}>
      <div className={styles.from}>
        <div className={styles.text}>{from}</div>
        <div className={styles.box}>?</div>
      </div>
      <div className={styles.to}>
        <div className={styles.text}>{to}</div>
        <div className={styles.box}>?</div>
      </div>
    </div>
  )
}

export default Expression