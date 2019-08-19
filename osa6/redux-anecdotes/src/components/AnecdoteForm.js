import React from 'react'

import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    props.store.dispatch(
      createAnecdote(anecdote)
    )
    event.target.anecdote.value = ''
  }

  return (
    <form onSubmit={addAnecdote}>
      <div><input name="anecdote"/></div>
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm