import React from 'react'

const Expression = (props) => {
  const { from, to, transitioning } = props;

  return (
    <div className={`expression ${transitioning ? 'transitioning' : ''}`}>
      <div className='from'>
        <div className='text'>{from}</div>
        <div className='box'>?</div>
      </div>
      <div className='to'>
        <div className='text'>{to}</div>
        <div className='box'>?</div>
      </div>
    </div>
  )
}

export default Expression