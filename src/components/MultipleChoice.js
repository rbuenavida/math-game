import React from 'react'
import styles from './MultipleChoice.module.css'

const MultipleChoice = (props) => {
  const { values, selected, correct, onClick } = props
  const classes = correct ? `tada ${styles.positive}` : `${styles.negative} wobble`

  return (
    <div className={styles.multipleChoice}>
      {values.map(res => (
        <div
          className={`${styles.choice} animated ${selected === res ? classes : ''}`}
          onClick={() => onClick(res)}>
          {res}
        </div>
      ))}
    </div>
  )
}

export default MultipleChoice