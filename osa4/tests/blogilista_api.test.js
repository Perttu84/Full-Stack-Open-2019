const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Testi',
    author: 'Perttu Punakallio',
    url: 'http://blogi.fi',
    likes: 10
  },
  {
    title: 'Mies',
    author: 'Erkki Esimerkki',
    url: 'http://mies.com',
    likes: 100
  },
  {
    title: 'Höpöhöpö',
    author: 'Jaska',
    url: 'http://huuhaa.uk',
    likes: 69
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe('format and number of blogs in database', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('the number of blogs is correct', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(3)
  })
})

afterAll(() => {
  mongoose.connection.close()
})