import { useState, useEffect, useContext } from 'react'
import { useNotificationDispatch } from './NotificationContext'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [createVisible, setCreateVisible] = useState(false)
  const dispatch = useNotificationDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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

  const setNotification = (notification) => {
    dispatch(notification)
    setTimeout(() => {
      dispatch({ type: 'NULLIFY' })
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log('logging in with', username)
    } catch (e) {
      setNotification({ type: 'BADLOGIN' })
    }
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
      setNotification({ type: 'ADD', blog: added })
      updateBlogs()
      setCreateVisible(false)
    } catch (e) {
      setNotification({ type: 'FAILED', errormsg: e.response.data.error })
    }
  }

  const handleLike = async (blogObject) => {
    try {
      const updated = await blogService.updateLikes(blogObject)
      setNotification({ type: 'LIKE', blog: updated })
      updateBlogs()
    } catch (e) {
      setNotification({ type: 'LIKEFAILED' })
    }
  }

  const handleDeletion = async (blogObject) => {
    try {
      if (
        window.confirm(
          `Are you sure you want to delete ${blogObject.title} by ${blogObject.author}`,
        )
      ) {
        const deleted = await blogService.deleteBlog(blogObject)
        setNotification({ type: 'DELETE', blog: blogObject })
        updateBlogs()
      }
    } catch (e) {
      setNotification({ type: 'FAILED', errormsg: e.response.data.error })
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
        <div style={hideWhenVisible}>
          <button id="showCreateButton" onClick={() => setCreateVisible(true)}>
            CREATE A NEW BLOG
          </button>
        </div>
        <div style={showWhenVisible}>
          <BlogForm createBlog={handleCreation} />
          <button
            id="cancelCreateButton"
            onClick={() => setCreateVisible(false)}
          >
            CANCEL
          </button>
        </div>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h1>Blogs</h1>
        <h2>Log in</h2>
        <Notification />
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
        <Notification />
        {createBlogForm()}
        {blogs.sort(compareByLikes).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            handleLike={handleLike}
            handleDeletion={handleDeletion}
          />
        ))}
      </div>
    )
  }
}

export default App
