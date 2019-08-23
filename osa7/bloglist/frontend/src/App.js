import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import  { useField } from './hooks'
import { setMessage } from './reducers/notificationReducer'

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const username = useField('text')
  const password = useField('password')
  const newBlogName = useField('text')
  const newBlogAuthor = useField('text')
  const newBlogUrl = useField('url')

  useEffect(() => {
    const fetchBlogs = async () =>  {
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(function(a,b) {return b.likes-a.likes}))
    }
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
      fetchBlogs()
    }
  }, [])



  const handleRemoveClick = async (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      await blogService.remove(blog.id)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(function(a,b) {return b.likes-a.likes}))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login( { username: username.value, password: password.value } )
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      props.setMessage('Succesfully logged in', 'success', 2)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(function(a,b) {return b.likes-a.likes}))
    } catch (exception) {
      props.setMessage('Wrong username or password', 'error', 2)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
    blogService.setToken(null)
  }

  const newBlogFormRef = React.createRef()

  const handleNewBlog = async (event) => {
    try {
      event.preventDefault()
      const blogObject = {
        title: newBlogName.value,
        author: newBlogAuthor.value,
        url: newBlogUrl.value,
      }

      await blogService.create(blogObject)
      newBlogFormRef.current.toggleVisibility()
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(function(a,b) {return b.likes-a.likes}))
      newBlogName.reset()
      newBlogAuthor.reset()
      newBlogUrl.reset()
      props.setMessage(`a new blog ${newBlogName.value} by ${newBlogAuthor.value} added succesfully`, 'success', 2)
    } catch(exception) {
      props.setMessage(exception.response.data.error, 'error', 2)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input {...username} reset={null}/>
      </div>
      <div>
        password
        <input {...password} reset={null}/>
      </div>
      <button type="submit">login</button>
    </form>
  )



  const newBlogForm = () => {

    return (
      <div>
        <Togglable buttonLabel="new note" ref={newBlogFormRef}>
          <h2>create new</h2>
          <NewBlogForm
            handleSubmit={handleNewBlog}
            newBlogName={newBlogName}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
          />
        </Togglable>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={() => handleLogout()}>logout</button>
      </p>
      {newBlogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} user={user} handleRemoveClick={handleRemoveClick}/>
      )}
    </div>
  )
}

export default connect(null, { setMessage })(App)
