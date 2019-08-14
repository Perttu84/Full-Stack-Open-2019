import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string,
  className: PropTypes.oneOf(['success, error'])
}

export default Notification