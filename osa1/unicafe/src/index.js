import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const average = (good, neutral, bad) => (good-bad)/(good+neutral+bad)

const positive = (good, neutral, bad) => (good/(good+neutral+bad)*100).toString() + " %"

const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)

const Statistic = ({text, value}) => (
  <tr>
  <td>{text}</td>
  <td>{value}</td>
  </tr>
  )

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
	  <table>
	  <Statistic text="good" value={good}/>
	  <Statistic text="neutral" value={neutral}/>
	  <Statistic text="bad" value={bad}/>
	  <Statistic text="average" value={average(good,neutral,bad)}/>
	  <Statistic text="positive" value={positive(good, neutral, bad)}/>
	  </table>
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