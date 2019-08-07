const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'TypeError') {
    return response.status(400).send({ error: 'id not found in database' })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).send({ error: 'invalid token' })
  }

  next(error)
}

module.exports = {
  errorHandler
}