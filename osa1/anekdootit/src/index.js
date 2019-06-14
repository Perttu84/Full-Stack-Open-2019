import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, text}) => (
                 <button onClick={handleClick}>
                 {text}
                 </button>
                )

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))

  const handleClick = () => setSelected(Math.floor(Math.random() * props.anecdotes.length))
  
  const handleVoteClick = () => {
  	const votes_copy = [ ...votes ]
  	votes_copy[selected] += 1
  	setVotes(votes_copy)
  }


  return (
    <div>
      {props.anecdotes[selected]}
      <br></br>
      has {votes[selected]} votes
      <br></br>
      <Button handleClick={handleVoteClick} text="vote"/>
      <Button handleClick={handleClick} text="next anecdote"/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)