import React, { useState } from 'react'
import Badge from './Badge'

const Summary = (props) => {
    const { show, score, onPlayAgain } = props

    // Hide the summary initially until it's rendered once to skip the initial bounce up animation
    const [defaultClasses, setDefaultClasses] = useState('hidden')

    setTimeout(() => setDefaultClasses(''), 1000)

    return (
      <div className={`summary animated ${show ? 'bounceInDown' : 'bounceOutUp'} ${defaultClasses}`}>
        <div className='title'>
          <div className='big'>GOOD JOB!</div>
          Your Score is:
        </div>
        <Badge score={score}/>
        <div className='button' onClick={onPlayAgain}>PLAY AGAIN</div>
      </div>
    )
  }

  export default Summary