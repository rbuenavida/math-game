import React, { useEffect, useRef } from 'react'
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
      animation.current.classList.remove('hidden');
      animation.current.className += scoreChange > 0 ? ' positive fadeOutUp' : ' negative fadeOutDown';
    }
  }, [scoreChange])  
    
  const formattedScore = score.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,")

  return (
    <div className='header'>
      <div className='container'>
        <Timer endTime={endTime} onTimerEnd={onTimerEnd}/>
        <div className='status'>
          <div className='status-item max'>up to {max}</div>
          <div className='status-item rate'>{answered}/{asked}</div>
          <div className='status-item score'>
            {formattedScore}
            {multiplier > 1 &&
            <div className='multiplier'>x{multiplier}</div>}
            {scoreChange !== 0 &&
              <div ref={animation} className={`change animated`}>{scoreChange > 0 ? '+' : ''}{scoreChange}</div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header