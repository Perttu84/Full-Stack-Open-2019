import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)

const ShowCount = ({count, type}) => (<p>{type} {count}</p>)

const Average = ({good, neutral, bad}) => (<p>average {(good-bad)/(good+neutral+bad)}</p>)

const Positive = ({good, neutral, bad}) => (<p>positive {good/(good+neutral+bad)*100} %</p>)

const Statistic = ({text, value}) => (<p>text </p>)
const Statistics = ({good, neutral, bad}) => {
	if (good+neutral+bad==0) {
		return (
		  <>
          <h1>statistics</h1>
          <p>No feedback given</p>
          </>
		)
	}
	return (
	<>
	  <h1>statistics</h1>
	  <ShowCount count={good} type='good' />
	  <ShowCount count={neutral} type='neutral' />
	  <ShowCount count={bad} type='bad' />
	  <Average good={good} neutral={neutral} bad={bad} />
	  <Positive good={good} neutral={neutral} bad={bad} />
	</>
	)
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text='good' />
      <Button handleClick={()=>setNeutral(neutral+1)} text='neutral' />
      <Button handleClick={()=>setBad(bad+1)} text='bad' />     
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)