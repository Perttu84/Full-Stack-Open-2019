import React, { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const handleLikeClick =  () => {
    const updatedObject = {
    user: blog.user.id,
    likes: likes + 1,
    author: blog.author,
    title: blog.title,
    url: blog.url
    }
    const id = blog.id
    blogService.addLike(updatedObject, id)
    setLikes(likes+1)
    }
  if (!showDetails) {
    return (
      <div className='blog' onClick={() => setShowDetails(!showDetails)}>
        {blog.title} {blog.author}
      </div>
    )
  }
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
export default Blog