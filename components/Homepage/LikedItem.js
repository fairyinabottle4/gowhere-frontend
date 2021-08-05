import blogService from '../../services/blogs'
import { toggleLike, removeBlog } from '../../reducers/blogsReducer'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { initializeUsers } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notifReducer'


const LikedItem = (props) => {
  const dispatch = useDispatch()
  const user = props.user

  const likedPlace = props.likedPlace
  const temp = likedPlace.parent.userLiked.find(n => n.username === user.username)
  const parent = likedPlace.parent
  const indexCurr = parent.userLiked.indexOf(temp)

  const likedPlaceId = props.id

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


  const handleDelete = async () => {
      if (window.confirm(`Remove blog ${likedPlace.title}?`)) {
        const original = await blogService.getSingle(parent.id)
        const tempVisited = original.userVisited.find(n => n.username === user.username)
        const currVisitStatus = tempVisited.visited
        const indexVisited = original.userVisited.indexOf(tempVisited)
        const updatedUserVisited = { username: user.username, visited: currVisitStatus}
        const updatedUserLiked = { username: user.username, liked: false}
        parent.userLiked[indexCurr] = updatedUserLiked
        original.userVisited[indexVisited] = updatedUserVisited
        const updatedParentBlog = {...parent, userLiked: parent.userLiked, userVisited: original.userVisited}
        updateBlog(parent.id, updatedParentBlog)
        deleteBlog(likedPlaceId)
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