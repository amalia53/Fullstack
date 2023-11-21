const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "Test title 1",
    "author": "Test author 1",
    "url": "Test url 1",
    "likes": 1
  },
  {
    "title": "Test title 2",
    "author": "Test author 2",
    "url": "Test url 2",
    "likes": 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs is returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

test('identificator is named id', async () => {
  const response = await api.get('/api/blogs')
  
  response.body.forEach(blog => expect(blog.id).toBeDefined())
})

test('a blog can be added', async () => {
  const newBlog = {
    "title": "New title",
    "author": "New author",
    "url": "New url",
    "likes": 3
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length + 1)

  const titles = response.body.map(r => r.title)
  expect(titles).toContain('New title')
})

test('when no value is given to likes, is saved as 0 likes', async () => {
  const newBlog = {
    "title": "New title",
    "author": "New author",
    "url": "New url"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)

  const response = await api.get('/api/blogs')
  expect(response.body[initialBlogs.length].likes).toBe(0)

})

test('when no url is given, bad request', async () => {
  const newBlog = {
    "title": "New title without url",
    "author": "New author without url",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})


test('when no title is given, bad request', async () => {
  const newBlog = {
    "author": "New author without title",
    "url": "New url without title"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
    await mongoose.connection.close()
})