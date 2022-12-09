import React, { useEffect, useRef } from 'react'
import styles from './Header.module.css'
import Timer from './Timer'

const Header = (props) => {
  const { 
    onTimerEnd, 
    endTime, 
    status: { multiplier, max, asked, answered, score, scoreChange},
  } = props
  
  const animation = useRef(null)

  useEffect(() => {
    if(animation.current) {
      animation.current.classList.remove(styles.hidden);
      animation.current.className += scoreChange > 0 ? ` ${styles.positive} fadeOutUp` : ` ${styles.negative} fadeOutDown`;
    }
  }, [scoreChange])  
    
  const formattedScore = score.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")

  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Timer endTime={endTime} onTimerEnd={onTimerEnd}/>
        <div className={styles.status}>
          <div className={`${styles.statusItem} ${styles.max}`}>up to {max}</div>
          <div className={`${styles.statusItem} ${styles.rate}`}>{answered}/{asked}</div>
          <div className={`${styles.statusItem} ${styles.score}`}>
            {formattedScore}
            {multiplier > 1 &&
            <div className={styles.multiplier}>x{multiplier}</div>}
            {scoreChange !== 0 &&
              <div ref={animation} className={`${styles.change} animated`}>{scoreChange > 0 ? '+' : ''}{scoreChange}</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header