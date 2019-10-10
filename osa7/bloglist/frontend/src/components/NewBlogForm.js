import React from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'
import { Form } from 'semantic-ui-react'

const NewBlogForm = (props) => {
  const newBlogName = useField('text')
  const newBlogAuthor = useField('text')
  const newBlogUrl = useField('url')

  const handleNewBlog = async (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: newBlogName.value,
        author: newBlogAuthor.value,
        url: newBlogUrl.value,
      }
      props.createBlog(blogObject)
      newBlogName.reset()
      newBlogAuthor.reset()
      newBlogUrl.reset()
      props.setMessage(`a new blog ${newBlogName.value} by ${newBlogAuthor.value} added succesfully`, 'success', 2)
    } catch(exception) {
      props.setMessage(exception.response.data.error, 'error', 2)
    }
  }

  return (
    <Form onSubmit={handleNewBlog}>
      <Form.Group>
        <Form.Input {...newBlogName} reset={null} label='title'/>
        <Form.Input {...newBlogAuthor} reset={null} label='author'/>
        <Form.Input {...newBlogUrl} reset={null} label='url'/>
      </Form.Group>
      <Form.Button type="submit">create</Form.Button>
    </Form>
  )
}

export default connect(null, { setMessage, createBlog })(NewBlogForm)