import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login.js'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


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


const handleCreateBlog = async blogObject => {
  
  blogFormRef.current.toggleVisibility()

  const blog = await blogService.create(blogObject)
  

  setBlogs(blogs.concat(blog))

  setMessage(`a new blog ${blog.title} by ${blog.author} added`)
  setTimeout(() => {
    setMessage(null)
  }, 5000)
  

}

const handleLike = async blog => {
  console.log('user before like:')
  const updatedBlog = {
    ...blog,
    likes: blog.likes + 1,
    user: blog.user.id,
  }


  const returnedBlog = await blogService.update(blog.id, updatedBlog)

  console.log('returned blog:', returnedBlog)

  setBlogs(blogs.map(b => 
  b.id === blog.id 
  ? {...returnedBlog, user: blog.user} 
  : b
  ))

}

const handleRemove = async blog => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
    await blogService.remove(blog.id)

    setBlogs(blogs.filter(b => b.id !== blog.id))
  }
}

    
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message}/>

      <p>{user.name} logged in
      <button onClick={handleLogout}>logout</button>
      </p>


      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={handleCreateBlog} />
    </Togglable>

      {blogs
      .slice()
      .sort((a, b) => b.likes - a.likes)
      .map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} handleRemove={() => handleRemove(blog)} canRemove= {blog.user && blog.user.username === user.username}/>
      )}
    </div>
  )
}


export default App