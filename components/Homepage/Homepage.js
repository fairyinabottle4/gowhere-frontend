import blogService from '../../services/blogs'
import { toggleLike, createBlog, removeBlog } from '../../reducers/blogsReducer'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LikedItem from './LikedItems'
import Blog from '../Blog'
import { Button, Link } from '@material-ui/core'
import { initializeUsers } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notifReducer'

const Homepage = (props) => {
  const currUser = props.user
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  //find the id of the current user
  const userLikes = users?.jsonUser?.find(n => n.username === currUser.username)
  const userVisited = users?.jsonVisited?.find(n => n.username === currUser.username)
  //liked places
  const likedPlaces = userLikes?.blogs
  const visitedPlaces = userVisited?.visited
  //blogs will be visited places
  // const visitedPlaces = user.likedPlaces

  const dispatch = useDispatch()

  const VisitedItem = (props) => {

    const user = props.user
    const visitedPlace = props.visitedPlace
    const visitedPlaceId = props.id
    const temp = visitedPlace.parent.userVisited.find(n => n.username === user.username)
    const parent = visitedPlace.parent
    const indexCurr = parent.userVisited.indexOf(temp)

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
        console.log(original)
        const tempLiked = original.userLiked.find(n => n.username === user.username)
        const currLikedStatus = tempLiked.liked
        const indexLiked = original.userLiked.indexOf(tempLiked)
        const updatedUserVisited = { username: user.username, visited: false}
        const updatedUserLiked = { username: user.username, liked: currLikedStatus}
        original.userLiked[indexLiked] = updatedUserLiked
        parent.userVisited[indexCurr] = updatedUserVisited
        const updatedParentBlog = {...parent, userLiked: original.userLiked, userVisited: parent.userVisited}
        console.log(updatedParentBlog)
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

  return (
    <div>
      <h2>Places I like</h2>
      {likedPlaces?.map(place => <LikedItem id={place.id} likedPlace={place} user={currUser}/>)}
      <h2>Places I visited</h2>
      {visitedPlaces?.map(place => <VisitedItem id={place.id} visitedPlace={place} user={currUser} />)}
    </div>
  )
}

export default Homepage