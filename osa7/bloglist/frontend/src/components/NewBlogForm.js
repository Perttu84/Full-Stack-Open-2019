import React from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ handleSubmit, newBlogName, newBlogAuthor, newBlogUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input {...newBlogName} reset={null}/>
      </div>
      <div>
        author
        <input {...newBlogAuthor} reset={null}/>
      </div>
      <div>
        url
        <input {...newBlogUrl} reset={null}/>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  newBlogName: PropTypes.object.isRequired,
  newBlogAuthor: PropTypes.object.isRequired,
  newBlogUrl: PropTypes.object.isRequired
}

export default NewBlogForm