import blogService from '../../services/blogs'
import { toggleLike, removeBlog } from '../../reducers/blogsReducer'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { initializeUsers } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notifReducer'


const LikedItem = (props) => {
  const dispatch = useDispatch()


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
      dispatch(setNotification(`Blog removed from liked list`))
    } else {
        dispatch(setNotification('could not remove'))
    }
    } catch (exception) {
    dispatch(setNotification("Could not remove"))
    }
  }

  const likedPlace = props.likedPlace
  const likedPlaceId = props.id

  const handleDelete = () => {
      if (window.confirm(`Remove blog ${likedPlace.title}?`)) {
      deleteBlog(likedPlaceId)
      const parent = likedPlace.parent
      const updatedParentBlog = {parent, liked: !parent.liked}
      updateBlog(parent.id, updatedParentBlog)
      }
  }

  return (
      <div>
      <p>{likedPlace.title}</p>
      <Button onClick={handleDelete}>remove from likes</Button>
      </div>
  )
}

export default LikedItem