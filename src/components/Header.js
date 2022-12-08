import React from 'react'
import * as ReactDOM from 'react-dom'
import Timer from './Timer'

class Header extends React.PureComponent {
    constructor(props) {
      super(props);
      
      this.state = {
        score: 0,
        change: 0
      };
    }
    
    static getDerivedStateFromProps(props, state) {
      return {
        score: props.status.score,
        change: props.status.score - state.score
      };
    }
    
    getSnapshotBeforeUpdate() {
      if(this.change) {
        const node = ReactDOM.findDOMNode(this.change);
        node.className = 'change animated hidden';
      }
    }
    
    componentDidUpdate() {
      setTimeout(() => { // Timeout is needed for the animation to properly work
        if(this.change) {
          const {change} = this.state;
          const node = ReactDOM.findDOMNode(this.change);
          node.classList.remove('hidden');
          node.className +=
            change > 0 ? ' positive fadeOutUp' : ' negative fadeOutDown';
        }
      }, 0);
    }
    
    format(score) {
      return score.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
    }
    
    render() {
      const {onTimerEnd, endTime, status: {multiplier, max, asked, answered}} = this.props;
      const {score, change} = this.state;
      return (
        <div className='header'>
          <div className='container'>
            <Timer endTime={endTime} onTimerEnd={onTimerEnd}/>
            <div className='status'>
              <div className='status-item max'>up to {max}</div>
              <div className='status-item rate'>{answered}/{asked}</div>
              <div className='status-item score'>
                {this.format(score)}
                {multiplier > 1 &&
                <div className='multiplier'>x{multiplier}</div>}
                {change !== 0 &&
                <div ref={ref => this.change = ref} className='change animated'>{change > 0 ? '+' : ''}{change}</div>}
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  export default Header