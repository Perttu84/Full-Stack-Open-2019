import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, user, handleRemoveClick }) => {
  const [showDetails, setShowDetails] = useState(false)
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
    setLikes(likes+1)
  }

  if (!showDetails) {
    return (
      <div className='blog' onClick={() => setShowDetails(!showDetails)}>
        {blog.title} {blog.author}
      </div>
    )
  }
  if (user.username !== blog.user.username) {
    return (
      <div className='blog' onClick={() => setShowDetails(!showDetails)}>
        {blog.title} {blog.author}<br/>
        <a href={blog.url}>{blog.url}</a><br/>
        {likes} likes
        <button onClick={handleLikeClick}>like</button><br/>
        added by { blog.user.name }
      </div>
    )
  }
  return (
    <div className='blog' onClick={() => setShowDetails(!showDetails)}>
      {blog.title} {blog.author}<br/>
      <a href={blog.url}>{blog.url}</a><br/>
      {likes} likes
      <button onClick={handleLikeClick}>like</button><br/>
      added by { blog.user.name }<br/>
      <button onClick={() => handleRemoveClick(blog)}>remove</button>
    </div>
  )
}

export default Blog