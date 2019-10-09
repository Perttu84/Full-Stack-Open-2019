import React from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import { createComment } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

const NewCommentForm = (props) => {
  const newComment = useField('text')

  const handleNewComment = async (event) => {
    try {
      event.preventDefault()
      const commentObject = {
        content: newComment.value,
      }
      props.createComment(commentObject, props.blogId)
      newComment.reset()
      props.setMessage(`a new comment added succesfully`, 'success', 2)
    } catch(exception) {
      props.setMessage(exception.response.data.error, 'error', 2)
    }
  }

  return (
    <form onSubmit={handleNewComment}>
      <div>
        <input {...newComment} reset={null}/>
        <button type="submit">add comment</button>
      </div>
    </form>
  )
}

export default connect(null, { setMessage, createComment })(NewCommentForm)