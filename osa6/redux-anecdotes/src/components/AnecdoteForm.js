import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    props.store.dispatch(
      createAnecdote(anecdote)
    )
    props.store.dispatch(
      setMessage(`you added anecdote '${anecdote}'`))
    event.target.anecdote.value = ''
    setTimeout(() => {
      props.store.dispatch(setMessage(null))
    }, 5000)
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm