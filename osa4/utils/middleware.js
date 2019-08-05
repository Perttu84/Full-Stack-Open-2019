const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'TypeError') {
    return response.status(400).send({error: 'id not found in database'})
  }

  next(error)
}

module.exports = {
  errorHandler
}