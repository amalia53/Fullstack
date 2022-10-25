const listHelper = require('../utils/list_helper')

const empty = []

const blogs = [
  {
    title: "title",
    author: "author",
    url: "url",
    likes: 1,
  },
  {
    title: "title2",
    author: "author2",
    url: "url2",
    likes: 2,
  },
  {
    title: "title3",
    author: "author3",
    url: "url3",
    likes: 3,
  }
]

test("dummy returns one", () => {
  const result = listHelper.dummy(empty)

  expect(result).toBe(1)
})

describe("total likes", () => {

  test("of an empty list returns 0", () => {
    const result = listHelper.totalLikes(empty)

    expect(result).toBe(0)
  })
  
  test("of list of three blogs returns total of likes of all blogs", () => {
    const result = listHelper.totalLikes(blogs)

    expect(result).toBe(6)
  })

  test(" of list of one blog returns likes of the blog", () => {
    blogs.pop()
    blogs.pop()

    const result = listHelper.totalLikes(blogs)

    expect(result).toBe(blogs[0].likes)
  })
})