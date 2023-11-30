import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState()
  const [isError, setIsError] = useState(false)
  const [createVisible, setCreateVisible] = useState(false)


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
    } catch (e) {
      setIsError(true)
      setMessage('Wrong credentials')
      setTimeout(() => { setMessage() }, 4000)
      setTimeout(() => setIsError(false), 4000)
    }
    console.log('logging in with', username)
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const handleCreation = async (blogObject) => {
    try {
      const added = await blogService.create(blogObject)
      setMessage(`A new blog added`)
      setTimeout(() => { setMessage() }, 4000)
      updateBlogs()
      setCreateVisible(false)
    } catch (e) {
      setIsError(true)
      setMessage(e.response.data.error)
      setTimeout(() => { setMessage() }, 4000)
      setTimeout(() => setIsError(false), 4000)
    }
  }

  const handleLike = async (blogObject) => {
    try {
      const updated = await blogService.updateLikes(blogObject)
      setMessage(`Likes updated`)
      setTimeout(() => { setMessage() }, 4000)
      updateBlogs()
    } catch (e) {
      setIsError(true)
      setMessage('Update failed')
      setTimeout(() => { setMessage() }, 4000)
      setTimeout(() => setIsError(false), 4000)
    }
  }

  const updateBlogs = async () => {
    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  function compareByLikes(a, b) {
    if (a.likes > b.likes) return -1
    if (a.likes < b.likes) return 1
    return 0
  }

  const createBlogForm = () => {
    const hideWhenVisible = { display: createVisible ? 'none' : '' }
    const showWhenVisible = { display: createVisible ? '' : 'none' }

    return (
      <div>
        < div style={hideWhenVisible} >
          <button onClick={() => setCreateVisible(true)}>CREATE A NEW BLOG</button>
        </div >
        <div style={showWhenVisible}>
          <BlogForm createBlog={handleCreation} />
          <button onClick={() => setCreateVisible(false)}>CANCEL</button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in</h2>
        <Notification message={message} isError={isError} />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <div>{user.name} is logged in</div>
        <button onClick={handleLogout}>LOGOUT</button>
        <Notification message={message} isError={isError} />
        {createBlogForm()}
        {blogs.sort(compareByLikes).map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} />
        )}
      </div>
    )
  }
}

export default App