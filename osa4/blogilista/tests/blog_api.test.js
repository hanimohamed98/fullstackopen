const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require ('../models/blog')

const api = supertest(app)

const initialBlogs = [
    {
      title: 'Eka blogi',
      author: 'Hani',
      url: 'https://example.com',
      likes: 5,

    },
  ]

  beforeEach (async () => {
    await Blog.deleteMany ({})
    await Blog.insertMany(initialBlogs)
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, initialBlogs.length)
})



after(async () => {
  await mongoose.connection.close()
})