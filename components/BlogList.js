import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = blogs.sort((a,b) => b.votes - a.votes)
  return (
    <div>
      {sortedBlogs.map(blog => <Blog
        key={blog.id}
        blog={blog}
      />)}
    </div>
  )
}

export default Blogs