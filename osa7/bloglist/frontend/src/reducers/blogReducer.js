import blogService from '../services/blogs'

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