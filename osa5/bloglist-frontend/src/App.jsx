import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Togglable from './components/Togglable'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>{message}</div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
  )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })


    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )

    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  } catch {
    setMessage ('wrong username/password')

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
}

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />

      <form onSubmit={handleLogin}>
        <div>
         <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        </div>


      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  </div>
  )
}


const handleCreateBlog = async event => {
  event.preventDefault()
  
  blogFormRef.current.toggleVisibility()

  const blog = await blogService.create ({
    title,
    author,
    url,
  })

  setBlogs(blogs.concat(blog))
  setTitle('')
  setAuthor('')
  setUrl('')

  setMessage(`a new blog ${blog.title} by ${blog.author} added`)
  setTimeout(() => {
    setMessage(null)
  }, 5000)
  

}

    
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>

      <p>{user.name} logged in
      <button onClick={handleLogout}>logout</button>
      </p>


      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <h2>create new</h2>

        <form onSubmit={handleCreateBlog}>
           <div>
            title 
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
         />
        </div>

      <div>
        author
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url 
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type= "submit">create</button>
      </form>
    </Togglable>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App