import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [ messageType, setMessageType ] = useState(null)
  const [ newBlogName, setNewBlogName ] = useState('')
  const [ newBlogAuthor, setNewBlogAuthor ] = useState('')
  const [ newBlogUrl, setNewBlogUrl ] = useState('')
  const [ newBlogFormVisible, setNewBlogFormVisible ] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () =>  {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    }
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
      fetchBlogs()
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Succesfully logged in')
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 2000)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
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

const handleNewBlog = async (event) => {
  try {
    event.preventDefault()
    const blogObject = {
      title: newBlogName,
      author: newBlogAuthor,
      url: newBlogUrl,
      user: user.id
    }

    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
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
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const newBlogForm = () => {
    const hideWhenVisible = { display : newBlogFormVisible ? 'none' : '' }
    const showWhenVisible = { display : newBlogFormVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setNewBlogFormVisible(true)}>new note</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlogForm
            handleSubmit={handleNewBlog}
            handleNameChange={({ target }) => setNewBlogName(target.value)}
            handleAuthorChange={({ target }) => setNewBlogAuthor(target.value)}
            handleUrlChange={({ target }) => setNewBlogUrl(target.value)}
            newBlogName={newBlogName}
            newBlogAuthor={newBlogAuthor}
            newBlogUrl={newBlogUrl}
          />
          <button onClick={() => setNewBlogFormVisible(false)}>cancel</button>
        </div>
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
        <h2>create new</h2>
        {newBlogForm()}
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
