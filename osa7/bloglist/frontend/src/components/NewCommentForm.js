import React from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import { createComment } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import { Form } from 'semantic-ui-react'

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
      props.setMessage('a new comment added succesfully', 'success', 2)
    } catch(exception) {
      props.setMessage(exception.response.data.error, 'error', 2)
    }
  }

  return (
    <Form onSubmit={handleNewComment}>
      <Form.Group>
        <Form.Input {...newComment} reset={null}/>
        <Form.Button type="submit">add comment</Form.Button>
      </Form.Group>
    </Form>
  )
}

export default connect(null, { setMessage, createComment })(NewCommentForm)