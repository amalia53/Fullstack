import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
    console.log('logging in with', username)
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }
    const added = await blogService.create(newBlog)
    setBlogs(blogs.concat(added))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={handleLogin}>
          <div>
            Username:
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password:
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">LOGIN</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <div>{user.name} is logged in</div>
        <button onClick={handleLogout}>LOGOUT</button>
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
          <button type="submit">Create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }

}



export default App