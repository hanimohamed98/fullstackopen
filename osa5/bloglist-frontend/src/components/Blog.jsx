import { useState } from 'react'


const Blog = ({ blog, handleLike, handleRemove, canRemove}) => {
  const [showDetails, setShowDetails] = useState(false)
  
  if (showDetails) {
    return (
    <div>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowDetails(false)}>hide</button>
      </div>

      <div>{blog.url}</div>

      <div>
        likes {blog.likes}
        <button onClick={handleLike}>like</button>
      </div>

      <div>{blog.user && blog.user.name}</div>

    {canRemove && (
      <button onClick={handleRemove}>delete</button>
    )}
    </div>
    )
  }
  
  
  return (
  <div>
    {blog.title} {blog.author}
    <button onClick={() => setShowDetails(true)}>
      view
    </button>
  </div>  
)

}
export default Blog