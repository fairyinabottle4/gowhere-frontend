import blogService from '../../services/sites'
import { toggleStatus, createBlog, removeSite } from '../../reducers/sitesReducer'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@material-ui/core'
import { initializeUsers } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notifReducer'


const VisitedItem = (props) => {
  const dispatch = useDispatch()

  const user = props.user
  const visitedPlace = props.visitedPlace
  const visitedPlaceId = props.id
  const temp = visitedPlace.parent.userVisited.find(n => n.username === user.username)
  const parent = visitedPlace.parent
  const indexCurr = parent.userVisited.indexOf(temp)

  const updateBlog = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogObject)
      dispatch(toggleStatus(blogId, updatedBlog))
      // dispatch(setNotification(`One like added to ${updatedBlog.title}`))
    } catch (exception) {
      dispatch(setNotification("Could not update blog"))
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const response = await blogService.remove(blogId)
    if (response.status === 204) {
      dispatch(removeSite(blogId))
      dispatch(initializeUsers())
      dispatch(setNotification(`Blog removed from visited list`))
    } else {
        dispatch(setNotification('could not remove'))
    }
    } catch (exception) {
        dispatch(setNotification(exception))
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${visitedPlace.title}?`)) {
      const original = await blogService.getSingle(parent.id)
      const tempLiked = original.userLiked.find(n => n.username === user.username)
      const currLikedStatus = tempLiked.liked
      const indexLiked = original.userLiked.indexOf(tempLiked)
      const updatedUserVisited = { username: user.username, visited: false}
      const updatedUserLiked = { username: user.username, liked: currLikedStatus}
      original.userLiked[indexLiked] = updatedUserLiked
      parent.userVisited[indexCurr] = updatedUserVisited
      const updatedParentBlog = {...parent, userLiked: original.userLiked, userVisited: parent.userVisited}
      updateBlog(parent.id, updatedParentBlog)
      deleteBlog(visitedPlaceId)
    }
  }

  return (
    <div>
      <p>{visitedPlace.title}</p>
      <Button onClick={handleDelete}>remove from visited</Button>
    </div>
  )

}


export default VisitedItem