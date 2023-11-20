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

afterAll(async () => {
    await mongoose.connection.close()
})