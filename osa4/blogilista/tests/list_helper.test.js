const { test, describe } = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


describe('total likes', () => {
  const listWithOneBlog = [
    {
      title: 'Eka blogi',
      author: 'Hani',
      url: 'https://example.com',
      likes: 5,

    },
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

    test('when list is empty, returns zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(result, 0)
  })

})