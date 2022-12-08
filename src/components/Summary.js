import React from 'react'
import Badge from './Badge'

class Summary extends React.PureComponent {
    componentDidMount() {
      // Hide the summary initially until it's rendered once to skip the initial bounce up animation
      this.mounted = true; 
    }
    
    render() {
      const {show, score, onPlayAgain} = this.props;
      return (
        <div class={`summary ${!this.mounted ? 'hidden' : ''} animated ${show ? 'bounceInDown' : 'bounceOutUp'}`}>
          <div className='title'>
            <div className='big'>GOOD JOB!</div>
            Your Score is:
          </div>
          <Badge score={score}/>
          <div className='button' onClick={onPlayAgain}>PLAY AGAIN</div>
        </div>
      );
    }
  }

  export default Summary