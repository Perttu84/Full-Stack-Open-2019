import React from 'react'
import { connect } from 'react-redux'
import  { useField } from '../hooks'
import { createBlog } from '../reducers/blogReducer'
import { setMessage } from '../reducers/notificationReducer'

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
    <form onSubmit={handleNewBlog}>
      <div>
        title:
        <input {...newBlogName} reset={null}/>
      </div>
      <div>
        author
        <input {...newBlogAuthor} reset={null}/>
      </div>
      <div>
        url
        <input {...newBlogUrl} reset={null}/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default connect(null, { setMessage, createBlog })(NewBlogForm)