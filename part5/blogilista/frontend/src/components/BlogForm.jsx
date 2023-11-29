import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleCreation = async (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h3>Create new</h3>
      <form onSubmit={handleCreation}>
        <div>
          Title: <input type="text" value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)} />
        </div>
        <div>
          Author: <input type="text" value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)} />
        </div>
        <div>
          Url: <input type="text" value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)} />
        </div>
        <button type="submit">CREATE</button>
      </form>
    </div>
  )
}

export default BlogForm