import React, { useState } from 'react'
import Badge from './Badge'
import styles from './Summary.module.css'

const Summary = (props) => {
    const { show, score, onPlayAgain } = props

    // Hide the summary initially until it's rendered once to skip the initial bounce up animation
    const [defaultClasses, setDefaultClasses] = useState(styles.hidden)

    setTimeout(() => setDefaultClasses(''), 1000)

    return (
      <div className={`${styles.summary} animated ${show ? 'bounceInDown' : 'bounceOutUp'} ${defaultClasses}`}>
        <div className={styles.title}>
          <div className={styles.big}>GOOD JOB!</div>
          Your Score is:
        </div>
        <Badge score={score}/>
        <div className={styles.button} onClick={onPlayAgain}>PLAY AGAIN</div>
      </div>
    )
  }

  export default Summary