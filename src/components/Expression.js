import React from 'react'
import * as ReactDOM from 'react-dom'

class Expression extends React.PureComponent {
    componentDidUpdate(prevProps) {
      const node = ReactDOM.findDOMNode(this.ref);
      if(this.props.transitioning) {
        node.classList.add('transitioning');
      }
      else {
        node.classList.remove('transitioning');
      }
    }
    
    render() {
      const {from, to} = this.props;
      return (
        <div className='expression' ref={ref => this.ref = ref}>
          <div className='from'>
            <div className='text'>{from}</div>
            <div className='box'>?</div>
          </div>
          <div className='to'>
            <div className='text'>{to}</div>
            <div className='box'>?</div>
          </div>
        </div>
      );
    }
  }

  export default Expression