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

  const Comments = ({comments}) => {
    if (comments.length > 0) {
      return (
        <div>
          <h3>Comments</h3>
            <ul>
              {comments.map(comment =>
                <li key={comment.id}>{comment.content}</li>
              )}
            </ul>
        </div>
      )
    }
    return null
  }

  if (user.username !== blog.user.username) {
    return (
      <div className='blog'>
        <h2>{blog.title} {blog.author}</h2>
        <a href={blog.url}>{blog.url}</a><br/>
        {likes} likes
        <button onClick={handleLikeClick}>like</button><br/>
        added by { blog.user.name }
        <Comments comments={blog.comments} />
      </div>
      
    )
  }
  return (
    <div className='blog'>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a><br/>
      {likes} likes
      <button onClick={handleLikeClick}>like</button><br/>
      added by { blog.user.name }<br/>
      <button onClick={() => handleRemoveClick(blog)}>remove</button>
      <Comments comments={blog.comments} />
    </div>
  )
}

export default BlogDetailedView
