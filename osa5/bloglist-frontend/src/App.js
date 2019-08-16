import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import  { useField } from './hooks'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [ messageType, setMessageType ] = useState(null)
  const [ newBlogName, setNewBlogName ] = useState('')
  const [ newBlogAuthor, setNewBlogAuthor ] = useState('')
  const [ newBlogUrl, setNewBlogUrl ] = useState('')

  const username = useField('text')
  const password = useField('password')

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
      setMessage('Succesfully logged in')
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 2000)
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(function(a,b) {return b.likes-a.likes}))
    } catch (exception) {
      setMessage('Wrong username or password')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 2000)
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
        title: newBlogName,
        author: newBlogAuthor,
        url: newBlogUrl,
      }

      await blogService.create(blogObject)
      newBlogFormRef.current.toggleVisibility()
      const blogs = await blogService.getAll()
      setBlogs(blogs.sort(function(a,b) {return b.likes-a.likes}))
      setNewBlogName('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      setMessage(`a new blog ${newBlogName} by ${newBlogAuthor} added succesfully`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 2000)
    } catch(exception) {
      setMessage(exception.response.data.error)
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 2000)

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
            handleNameChange={({ target }) => setNewBlogName(target.value)}
            handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
            handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
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
        <Notification message={message} className={messageType} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} className={messageType} />
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

export default App
