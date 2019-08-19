import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const addVote = (anecdote) => {
    props.vote(anecdote.id)
    props.setMessage(`you voted '${anecdote.content}'`)
    setTimeout(() => {
      props.setMessage(null)
    }, 5000)
  }
  const anecdotes = props.anecdotes
  const filterValue = props.filter
  const anecdotesToShow = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterValue.toLowerCase()))
  return (<div>
    {anecdotesToShow.map(anecdote =>
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const mapDispatchToProps = {
  vote,
  setMessage
}

const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList