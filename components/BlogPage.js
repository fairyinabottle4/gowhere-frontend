import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  useParams,
  Redirect
} from "react-router-dom"
import { Link } from '@material-ui/core'  

const BlogPage = () => {
    
  const blogs = useSelector(state => state.blogs)

  const id = useParams().id
  const blog = blogs.find(n => n.id === id)

  if (!blog) {
    return <Redirect to="/blogs" />
  }
  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <Link href={blog.url}>{blog.url}</Link>
      <p>added by {blog.user.name}</p>
    </div>
  )
}


  export default BlogPage