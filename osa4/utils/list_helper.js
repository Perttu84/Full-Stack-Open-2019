const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likesArray = blogs.map(blog => blog.likes)
  const reducer = (sum, item) => {
    return sum + item
  }

  return likesArray.reduce(reducer,0)
}

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max.apply(Math, blogs.map(function(blog) { return blog.likes }))
  const blogWithMostLikes = blogs.find(function(blog){ return blog.likes === mostLikes })
  return {
    'title': blogWithMostLikes.title,
    'author': blogWithMostLikes.author,
    'likes': blogWithMostLikes.likes
  }
}

const mostBlogs = (blogs) => {
  const blogCountByAuthor = _.map(_.countBy(blogs, 'author'), (val, key) => ({ 'author': key, 'blogs': val }))
  const mostBlogs = Math.max.apply(Math, blogCountByAuthor.map(function(author) { return author.blogs }))
  const authorWithMostBlogs = blogCountByAuthor.find(function(author){ return author.blogs === mostBlogs })
  return authorWithMostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}