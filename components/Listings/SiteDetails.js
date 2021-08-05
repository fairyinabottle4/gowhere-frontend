import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import blogService from '../../services/sites'
import { useDispatch } from 'react-redux'
import { toggleStatus, initBlogs, removeBlog } from '../../reducers/sitesReducer'
import { setNotification } from '../../reducers/notifReducer'
import { initializeUsers } from '../../reducers/usersReducer'
import { Button, Link } from '@material-ui/core'

const SiteDetails = ({blog, user}) => {
  const updateBlog = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogObject)
      dispatch(toggleStatus(blogId, updatedBlog))
      // dispatch(setNotification(`One like added to ${updatedBlog.title}`))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification("Could not update blog"))
    }
  }

  const dispatch = useDispatch()
  const likedList = blog.userLiked.find(n => n.username === user.username)
  useEffect(() => {
    if (!likedList) {
      const newUser = { username: user.username, liked: false }
      const updatedArray = blog.userLiked.concat(newUser)
      const updatedBlog = {...blog, userLiked: updatedArray}
      updateBlog(blog.id, updatedBlog)
    }  
  },[])

  const visitedList = blog.userVisited.find(n => n.username === user.username)

  useEffect(() => {
    if (!visitedList) {
      const newUser = { username: user.username, visited: false }
      const updatedArray = blog.userVisited.concat(newUser)
      const updatedBlog = {...blog, userVisited: updatedArray}
      updateBlog(blog.id, updatedBlog)  
    }  
  },[])
  const liked = likedList?.liked
  const visited = visitedList?.visited

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
    const indexCurr = blog.userLiked.indexOf(likedList)
    //updatedBlog is the parent blog. This will have its liked status toggled
    //actually updatedUserLiked can simply use username: user.username and liked: true
    const updatedUserLiked = { username: likedList.username, liked: !likedList.liked}
    blog.userLiked[indexCurr] = updatedUserLiked
    const updatedBlog = {...blog, userLiked: blog.userLiked}    
    updateBlog(blog.id, updatedBlog)
    //childBlog is the spawned from the parent, 
    //it will contain a parent, which is the updatedBlog
    const childBlog = {...blog, parent: updatedBlog, opcode: 100}
    const newBlog = await blogService.create(childBlog)
    // dispatch(createBlog(newBlog))
    dispatch(initializeUsers())
    dispatch(initBlogs())
  }

  const handleVisited = async () => {
    const indexCurr = blog.userVisited.indexOf(visitedList)
    const updatedUserVisited = { username: visitedList?.username, visited: !visitedList.visited}
    blog.userVisited[indexCurr] = updatedUserVisited
    const updatedBlog = {...blog, userVisited: blog.userVisited}
    updateBlog(blog.id, updatedBlog)
    const childBlog = {...blog, parent: updatedBlog, opcode: 200}
    const newBlog = await blogService.create(childBlog)
    // dispatch(createBlog(newBlog))
    dispatch(initializeUsers())
    dispatch(initBlogs())
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

SiteDetails.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default SiteDetails
