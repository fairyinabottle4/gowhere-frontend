import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { addLike, removeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notifReducer'


const BlogDetails = ({blog}) => {

  const dispatch = useDispatch()

  const updateBlog = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogObject)
      dispatch(addLike(blogId, blogObject))
      dispatch(setNotification(`One like added to ${updatedBlog.title}`))
    } catch (exception) {
      dispatch(setNotification("Could not update blog"))
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const response = await blogService.remove(blogId)
      console.log(response.status)
      if (response.status === 204) {
        dispatch(removeBlog(blogId))
        dispatch(setNotification(`Blog ${blog.title} deleted`))
      } else {
        dispatch(setNotification("Could not delete blog"))
      }
    } catch (exception) {
      dispatch(setNotification("Could not delete blog"))
    }
  }


  const handleLike = () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    updateBlog(blog.id, updatedBlog)
  }

  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }
  
  return (
    <div className='blog-details'>
      <p>{blog.url}</p>
      <p>
        {blog.likes}
        <button onClick={handleLike} className='blog-like'>like</button>
      </p>
      <p>{blog.user.name}</p>
      <button onClick={handleDelete}>remove</button>
    </div>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogDetails
