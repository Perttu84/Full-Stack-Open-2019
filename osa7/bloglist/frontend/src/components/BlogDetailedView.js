import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogDetailedView = (props) => {
  const blog = props.blog
  const user = props.user
  const handleRemoveClick = props.handleRemoveClick
  const [likes, setLikes] = useState(blog.likes)
  const handleLikeClick = () => {
    const updatedObject = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    const id = blog.id
    blogService.update(updatedObject, id)
    props.initBlogs()
    setLikes(likes+1)
  }

  if (user.username !== blog.user.username) {
    return (
      <div className='blog'>
        {blog.title} {blog.author}<br/>
        <a href={blog.url}>{blog.url}</a><br/>
        {likes} likes
        <button onClick={handleLikeClick}>like</button><br/>
        added by { blog.user.name }
      </div>
    )
  }
  return (
    <div className='blog'>
      {blog.title} {blog.author}<br/>
      <a href={blog.url}>{blog.url}</a><br/>
      {likes} likes
      <button onClick={handleLikeClick}>like</button><br/>
      added by { blog.user.name }<br/>
      <button onClick={() => handleRemoveClick(blog)}>remove</button>
    </div>
  )
}

export default BlogDetailedView
