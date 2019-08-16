const blogs = [
  {
    title: 'Test-title',
    author: 'Perttu Punakallio'
  },
  {
    title: 'Nothing',
    author: 'Nobody'
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }