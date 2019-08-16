const blogs = [
  {
    title: 'Test-title',
    author: 'Perttu Punakallio',
    id: 1
  },
  {
    title: 'Nothing',
    author: 'Nobody',
    id: 2
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {
}

export default { getAll, setToken }