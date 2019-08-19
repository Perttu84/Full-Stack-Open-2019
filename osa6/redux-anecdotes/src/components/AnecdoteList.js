import React from 'react'

import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const addVote = (anecdote) => {
    props.store.dispatch(vote(anecdote.id))
    props.store.dispatch(
      setMessage(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      props.store.dispatch(setMessage(null))
    }, 5000)
  }
  const anecdotes = props.store.getState().anecdotes
    return (<div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => addVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
      </div>
    )
}

export default AnecdoteList