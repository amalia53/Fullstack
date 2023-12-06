import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike, handleDeletion }) => {
  const [viewMore, setViewMore] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showMore = () => {
    return (
      <div>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes} <button id="likeButton" onClick={() => handleLike(blog)}>LIKE</button>
        </div>
        <div>
          Added by {blog.user.name}
        </div>
        <div>
          <button onClick={() => handleDeletion(blog)}>DELETE</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      {blog.title} by {blog.author} <button id="viewMoreButton" onClick={() => setViewMore(!viewMore)}>{viewMore ? 'HIDE' : 'VIEW'}</button>
      {viewMore && showMore()}
    </div>
  )
}

export default Blog