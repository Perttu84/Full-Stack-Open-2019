const commentsRouter = require('express').Router()
const blogsRouter = require('./blogs')
const Comment = require('../models/comment')
const Blog = require('../models/blog')

blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  try {

    const blog = await Blog.findById(request.params.id)
    const comment = new Comment({
      content: body.content,
      blog: blog._id
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()
    response.status(201).json(savedComment.toJSON())
  } catch(exception) {
    next(exception)
  }
})

module.exports = commentsRouter