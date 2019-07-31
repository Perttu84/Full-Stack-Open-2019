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
  test('blog object identifier field is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[1].id).toBeDefined()
    expect(response.body[2].id).toBeDefined()
  })
})

describe('adding a blog works as expected', () => {
  test('number of blogs is increased by one and the title is correct', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Tester',
      url: 'http://newblog.com',
      likes: 5
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain(
      'New Blog'
    )
  })

  test('if likes is not defined for added blog a value of zero is given', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'Tester',
      url: 'http://newblog.com'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

  })

})

afterAll(() => {
  mongoose.connection.close()
})