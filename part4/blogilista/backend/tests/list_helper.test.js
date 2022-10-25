const listHelper = require('../utils/list_helper')

const empty = []

const blog = [{
  title: "title",
  author: "author",
  url: "url",
  likes: 0,
}]

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

  test(" of list of one blog returns likes of the blog", () => {

    const result = listHelper.totalLikes(blog)

    expect(result).toBe(blog[0].likes)
  })

  test("of list returns total of likes of all blogs", () => {
    const result = listHelper.totalLikes(blogs)

    expect(result).toBe(6)
  })
})

describe("favorite", () => {

  test("of an empty list returns null", () => {
    const result = listHelper.favoriteBlog(empty)

    expect(result).toEqual(null)
  })

  test("of list of one returns the only blog", () => {
    const result = listHelper.favoriteBlog(blog)

    expect(result).toEqual(blog[0])
  })

  test("of all blogs returns the one with most likes", () => {

    const result = listHelper.favoriteBlog(blogs)

    expect(result).toEqual({
      title: "title3",
      author: "author3",
      url: "url3",
      likes: 3,
    })
  })
})