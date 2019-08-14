import React, { useState } from 'react'
const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

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
      {blog.likes} likes
      <button onClick={() => console.log('liked')}>like</button><br/>
      added by 
    </div>
  )
}
export default Blog