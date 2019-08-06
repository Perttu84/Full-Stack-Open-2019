const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Testi',
    author: 'Perttu Punakallio',
    url: 'http://blogi.fi',
      likes: 10,
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

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  const user = new User({ username: 'root', password: 'sekret' })
  const newUser = await user.save()

  let blogObject = new Blog({
    title: initialBlogs[0].title,
    author: initialBlogs[0].author,
    url: initialBlogs[0].author,
    likes: initialBlogs[0].likes,
    userId: newUser.id
  })
  await blogObject.save()

  blogObject = new Blog({
    title: initialBlogs[1].title,
    author: initialBlogs[1].author,
    url: initialBlogs[1].author,
    likes: initialBlogs[1].likes,
    userId: newUser.id
  })
  await blogObject.save()

  blogObject = new Blog({
    title: initialBlogs[2].title,
    author: initialBlogs[2].author,
    url: initialBlogs[2].author,
    likes: initialBlogs[2].likes,
    userId: newUser.id
  })
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
    const users = await usersInDb()
    const newBlog = {
      title: 'New Blog',
      author: 'Tester',
      url: 'http://newblog.com',
      likes: 5,
      userId: users[0].id
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
    const users = await usersInDb()
    const newBlog = {
      title: 'New Blog',
      author: 'Tester',
      url: 'http://newblog.com',
      userId: users[0].id
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

  })

  test('if new blog is missing title expect status 400 Bad Request', async () => {
    const users = await usersInDb()
    const newBlog = {
      author: 'Tester',
      url: 'http://newblog.com',
      userId: users[0].id
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('if new blog is missing url expect status 400 Bad Request', async () => {
    const users = await usersInDb()
    const newBlog = {
      title: 'New Blog',
      author: 'Tester',
      userId: users[0].id
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting a single blog works as expected', () => {
  test('deleted blog is not found in db and status code 204 is returned when id is found in db', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('if id is malformatted expect status code 400 and error text malformatted id', async () => {
    const error = await api
      .delete('/api/blogs/1').
      expect(400)

    expect(error.body.error).toBe('malformatted id')
  })
})

describe('updating a blog works as expected', () => {
  test('the change can be found in database when id is found in database', async () => {
    const blogsAtStart = await blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({
        likes: blogToUpdate.likes + 1
      })
      .expect(200)
    const blogsAtEnd = await blogsInDb()

    expect(blogsAtEnd[0].likes).toBe(blogsAtStart[0].likes+1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})