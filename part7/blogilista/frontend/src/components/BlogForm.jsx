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
          Title:{' '}
          <input
            id="newTitle"
            type="text"
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
            placeholder="write title here..."
          />
        </div>
        <div>
          Author:{' '}
          <input
            id="newAuthor"
            type="text"
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
            placeholder="write name here..."
          />
        </div>
        <div>
          Url:{' '}
          <input
            id="newUrl"
            type="text"
            value={newUrl}
            onChange={({ target }) => setNewUrl(target.value)}
            placeholder="write url here..."
          />
        </div>
        <button id="createButton" type="submit">
          CREATE
        </button>
      </form>
    </div>
  )
}

export default BlogForm
