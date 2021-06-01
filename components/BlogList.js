import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import Blog from './Blog'

const Blogs = ({updateBlog, deleteBlog}) => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a,b) => b.votes - a.votes)
  return (
    <div>
      {sortedBlogs.map(blog => <Blog
        key={blog.id}
        updateBlog={updateBlog}
        deleteBlog={deleteBlog}
        blog={blog}
      />)}
    </div>
  )
}

export default Blogs