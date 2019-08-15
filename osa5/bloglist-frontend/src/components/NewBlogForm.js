import React from 'react'
import PropTypes from 'prop-types'

const NewBlogForm = ({ handleSubmit, handleNameChange, handleAuthorChange,
  handleUrlChange, newBlogName, newBlogAuthor, newBlogUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          type="text"
          value={newBlogName}
          name="NewBlogName"
          onChange={handleNameChange}
        />
      </div>
      <div>
        author
        <input
          type="text"
          value={newBlogAuthor}
          name="newBlogAuthor"
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        url
        <input
          type="url"
          value={newBlogUrl}
          name="newBlogUrl"
          onChange={handleUrlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

NewBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleNameChange: PropTypes.func.isRequired,
  handleAuthorChange: PropTypes.func.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
  newBlogName: PropTypes.string.isRequired,
  newBlogAuthor: PropTypes.string.isRequired,
  newBlogUrl: PropTypes.string.isRequired
}

export default NewBlogForm