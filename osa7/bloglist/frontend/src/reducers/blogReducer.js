import blogService from '../services/blogs'
import commentService from '../services/comments'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
      .sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  case 'NEW_BLOG':
    return action.data
      .sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  case 'REMOVE_BLOG':
    return action.data
      .sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  case 'NEW_COMMENT':
    return action.data
      .sort((a, b) => (a.likes > b.likes) ? -1 : 1)
  default: return state

  }
}

export const createBlog = newObject => {
  return async dispatch => {
    await blogService.create(newObject)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'NEW_BLOG',
      data: blogs
    })
  }
}

export const createComment = (newObject, id) => {
  return async dispatch => {
    await commentService.create(newObject, id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'NEW_COMMENT',
      data: blogs
    })
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'REMOVE_BLOG',
      data: blogs
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer