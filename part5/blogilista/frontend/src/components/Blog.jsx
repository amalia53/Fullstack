import { useState } from 'react'

const Blog = ({ blog }) => {
  const [viewMore, setViewMore] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const like = () => {
    console.log('Liked!')
  }

  const showMore = () => {
    return (
      <div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button onClick={() => like()}>like</button>
        </div>
        <div>
          Added by {blog.user.name}
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button onClick={() => setViewMore(!viewMore)}>{viewMore ? 'hide' : 'view'}</button>
      {viewMore && showMore()}
    </div>
  )
}

export default Blog