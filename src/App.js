import React, { useState, useEffect } from 'react'
// import logo from './logo.svg';
import styles from './App.module.css';

import Header from './components/Header'
import Expression from './components/Expression'
import Summary from './components/Summary'
import MultipleChoice from './components/MultipleChoice';

import problemTypes, { OPERATORS } from './services/ProblemTypes';

const TIME = 30; // Initial game duration, in seconds

const App = () => {
  const initialStatus = {
    score: 0,
    scoreChange: 0,
    max: 10,
    asked: 0,
    answered: 0,
    multiplier: 1
  }

  const problemType = problemTypes[OPERATORS.MIXED]()

  const [ state, setState ] = useState({
    status: { ...initialStatus },
    selected: -1,
    showSummary: false,
    endTime: Date.now() + TIME * 1000,
    prev: problemType.generateProblem(initialStatus.max),
    next: problemType.generateProblem(initialStatus.max)
  })

  useEffect(() => {
    if (state.selected !== -1) {
      setTimeout(() => {
        console.log('DOING SETTIMEOUT', state)
        const { status, next } = state
        setState({
          ...state,
          status: {
            ...status,
            scoreChange: 0
          },
          prev: next,
          next: problemType.generateProblem(status.max),
          selected: -1
        });
      }, 1500)
    }
  }, [state])

  const increaseScore = (selected) => {
    console.log('DOING increaseScore')
    const { status } = state;
    let endTime = state.endTime;
    let max = status.max;
    
    // Add time and increase max every 5 correct answers
    if(status.answered % 5 === 4) {
      endTime += 15000;
      max *= 2;
    }
    
    const score = status.score + (max * status.multiplier)
    const scoreChange = score - status.score

    setState({
      ...state,
      selected,
      endTime,
      status: {
        ...status,
        multiplier: Math.min(status.multiplier + 1, 5), 
        score,
        scoreChange,
        asked: status.asked + 1,
        answered: status.answered + 1,
        max
      }
    })
  }
  
  const decreaseScore = (selected) => {
    console.log('DOING decreaseScore')
    const { status } = state;

    // Decrease by MAX * <Correct Answer Probability>
    const score =  Math.max(0, status.score - Math.floor(status.max * 0.25))
    const scoreChange = score - status.score
    console.log(score, scoreChange)
    
    setState({
      ...state,
      selected,
      status: {
        ...status,
        multiplier: 1,
        score,
        scoreChange,
        asked: status.asked + 1
      }
    }); 
  }

  const handleOnClick = (value, prev) => {
    const { selected } = state
    if(selected !== -1) return
    
    if(value === prev.answer) {
      increaseScore(value)
    }
    else {
      decreaseScore(value)
    }
  }

  const handleOnTimerEnd = () => {
    setState({
      ...state,
      showSummary: true
    })
  }
  
  const handleOnPlayAgain = () => {
    const status = { ...initialStatus };
    setState({
      ...state,
      status,
      showSummary: false,
      endTime: Date.now() + TIME * 1000,
      prev: problemType.generateProblem(status.max),
      next: problemType.generateProblem(status.max)
    })
  }

  const {
    prev, 
    next, 
    status, 
    selected, 
    showSummary, 
    endTime
  } = state;

  return (
    <div className={styles.gameContainer}>
      <Header 
        status={status} 
        endTime={endTime} 
        onTimerEnd={handleOnTimerEnd}/>
      <div className={styles.body}>
        <Expression 
          from={prev.question} 
          to={next.question} 
          transitioning={selected !== -1}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.footerContainer}>
          <MultipleChoice 
            values={prev.choices} 
            selected={selected} 
            onClick={value => handleOnClick(value, prev)} 
            correct={selected === prev.answer}
          />
        </div>
      </div>
      <Summary 
        show={showSummary} 
        score={status.score} 
        onPlayAgain={handleOnPlayAgain}
      />
    </div>
  );
  
}

export default App;
