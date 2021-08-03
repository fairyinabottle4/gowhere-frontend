import React from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { toggleLike, createBlog, removeBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notifReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { Button, Link } from '@material-ui/core'

const BlogDetails = ({blog, user}) => {

  const dispatch = useDispatch()
  const temp = blog.userLiked.find(n => n.username === user.username)
  const liked = temp.liked
  //this inversion is done on purpose
  const visited = blog.visited

  const updateBlog = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogObject)
      dispatch(toggleLike(blogId, updatedBlog))
      // dispatch(setNotification(`One like added to ${updatedBlog.title}`))
    } catch (exception) {
      dispatch(setNotification("Could not update blog"))
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const response = await blogService.remove(blogId)
      if (response.status === 204) {
        dispatch(removeBlog(blogId))
        dispatch(initializeUsers())
        dispatch(setNotification(`Blog ${blog.title} deleted`))
      } else {
        dispatch(setNotification("Could not delete blog"))
      }
    } catch (exception) {
      dispatch(setNotification("Could not delete blog"))
    }
  }


  const handleLike = async () => {
    const indexCurr = blog.userLiked.indexOf(temp)
    //updatedBlog is the parent blog. This will have its liked status toggled
    //actually updatedUserLiked can simply use username: user.username and liked: true
    const updatedUserLiked = { username: temp.username, liked: !temp.liked}
    blog.userLiked[indexCurr] = updatedUserLiked
    const updatedBlog = {...blog, userLiked: blog.userLiked}    
    console.log(updatedBlog)
    updateBlog(blog.id, updatedBlog)
    //childBlog is the spawned from the parent, 
    //it will contain a parent, which is the updatedBlog
    const childBlog = {...blog, parent: updatedBlog, opcode: 100}
    const newBlog = await blogService.create(childBlog)
    console.log(newBlog)
    // dispatch(createBlog(newBlog))
    dispatch(initializeUsers())
  }

  //to be updated!
  const handleVisited = async () => {
    const updatedBlog = {...blog, liked: blog.liked, visited: !blog.visited}
    updateBlog(blog.id, updatedBlog)
    const childBlog = {...blog, parent: updatedBlog, opcode: 200}
    const newBlog = await blogService.create(childBlog)
    // dispatch(createBlog(newBlog))
    dispatch(initializeUsers())
  }


  const handleDelete = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog(blog.id)
    }
  }
  return (
    <div className='blog-details'>
      <Link href={blog.url}>{blog.url}</Link>
      <h2>
        {blog.likes}
        <Button 
          size='small' variant='contained' 
          color={liked ? 'secondary' : 'primary'} 
          onClick={!liked ? handleLike : null} className='blog-like'>{liked ? 'Already Liked' : "like"}
        </Button>
        <Button 
          size='small' variant='contained' 
          color={visited ? 'secondary' : 'primary'} 
          onClick={!visited ? handleVisited : null} className='blog-like'>{visited ? 'Already Visited!' : "Visit"}
        </Button>
      </h2>
      <p>{blog.description}</p>
      <img src={blog.imageUrl} alt={"Image could not be loaded"} />
      <Button size='small' variant='contained' color='inherit' onClick={handleDelete}>remove</Button>
    </div>
  )
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default BlogDetails
