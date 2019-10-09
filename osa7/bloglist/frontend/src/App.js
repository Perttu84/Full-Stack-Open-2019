import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'
import Notification from './components/Notification'
import NewBlogForm from './components/NewBlogForm'
import Togglable from './components/Togglable'
import BlogDetailedView from './components/BlogDetailedView'
import blogService from './services/blogs'
import loginService from './services/login'
import  { useField } from './hooks'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs, removeBlog, createBlog, createComment } from './reducers/blogReducer'
import { setUser, logoutUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'
import { Container, Table } from 'semantic-ui-react'


const App = (props) => {

  const padding = { padding: 5 }
  const username = useField('text')
  const password = useField('password')


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      props.setUser(user)
      props.initializeBlogs()
      props.initializeUsers()
    }
  }, [])

  const handleRemoveClick = async (blog) => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      props.removeBlog(blog)
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
      props.setUser(user)
      username.reset()
      password.reset()
      props.setMessage('Succesfully logged in', 'success', 2)
      props.initializeBlogs()
      props.initializeUsers()
    } catch (exception) {
      props.setMessage('Wrong username or password', 'error', 2)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    props.logoutUser()
    blogService.setToken(null)
  }

  const newBlogFormRef = React.createRef()



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
          <NewBlogForm />
        </Togglable>
      </div>
    )
  }

  const Blogs = () => {
    return (
      <div>
        {newBlogForm()}
        <Table striped>
          <Table.Body>
            {props.blogs.map(blog =>
              <Table.Row key={blog.id}>
                <Table.Cell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  {blog.author}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }

  const Users = () => {
    return (
      <div>
        <h2>Users</h2>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>blogs created</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {props.users.map(user =>
              <Table.Row key={user.id}>
                <Table.Cell><Link to={`/users/${user.id}`}>{user.name}</Link></Table.Cell>
                <Table.Cell>{user.blogs.length}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }

  const User = ({ user }) => {
    if (user === undefined) {
      return null
    }
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}>{blog.title}</li>
            )}
        </ul>
      </div>
    )
  }

  const userById = (id) =>
    props.users.find(a => a.id === id)

  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  const blogById = (id) =>
    props.blogs.find(a => a.id === id)

  if (props.user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  return (
    <Container>
    <Router>
      <div className="menu">
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
          {props.user.name} logged in
          <button onClick={() => handleLogout()}>logout</button>
      </div>
      <h2>blogs</h2>
      <Notification />
        <Route exact path="/" render={() => <Blogs />} />
        <Route exact path="/users" render={() => <Users />} />
        <Route exact path="/blogs" render={() => <Redirect to="/" />} />
        <Route exact path="/users/:id" render={({ match }) => <User user={userById(match.params.id)} />} />
        <Route exact path="/blogs/:id" render={({ match }) => <BlogDetailedView blog={blogById(match.params.id)}  user={props.user} handleRemoveClick={handleRemoveClick} initBlogs={props.initializeBlogs}/>} />
      </Router>
    </Container>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

export default connect(mapStateToProps, { setMessage, initializeBlogs, createBlog, removeBlog, setUser, logoutUser, initializeUsers, createComment })(App)
