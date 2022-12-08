import React from 'react'

class Timer extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = this.secondsToTimeObject(Math.floor((props.endTime - Date.now())/1000));
    }
    
    componentDidMount() {
      this.continouslyUpdateTime();
    }
    
    componentDidUpdate() {
      this.continouslyUpdateTime();
    }
    
    componentWillUnmount() {
      clearTimeout(this.timeout);
    }
    
    continouslyUpdateTime() {
      this.updateTime();
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        const {m, s} = this.state;
        if(m > 0 || s > 0) {
          this.continouslyUpdateTime();
        }
        else {
          this.props.onTimerEnd();
        }
      }, 50);
    }
    
    updateTime() {
      const {endTime} = this.props;
      const {m, s} = this.state;
      const remaining = Math.floor((endTime - Date.now()) / 1000);
  
      if(remaining !== m*6 + s) {
        this.setState(this.secondsToTimeObject(remaining));
      }
    }
    
    secondsToTimeObject(s) {
      return {m: Math.floor(s / 60), s: s % 60};
    }
    
    render() {
      const {m, s} = this.state;
      const remaining = m*60 + s;
      return (
        <div className={`timer ${remaining < 5 && remaining > 0? 'animated bounceIn red': ''}`} ref={ref => this.ref = ref}>{m > 9 ? '' : '0'}{m} : {s > 9 ? '' : '0'}{s}</div>
      );
    }
  }

  export default Timer