import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import blogService from '../../services/blogs'
import { toggleLike, createBlog, removeBlog } from '../../reducers/blogsReducer'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from '../Blog'
import { Button, Link } from '@material-ui/core'
import { initializeUsers } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notifReducer'

const Homepage = (props) => {
  const currUser = props.user
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  //find the id of the current user
  const user = users?.find(n => n.username === currUser.username)
  //liked places
  const likedPlaces = user?.blogs
  //blogs will be visited places
  // const visitedPlaces = user.likedPlaces

  const dispatch = useDispatch()

  const LikedItem = (props) => {


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
  return (
    <div>
      <h2>Places I like</h2>
      {likedPlaces?.map(place => <LikedItem id={place.id} likedPlace={place} />)}
    </div>
  )
}

export default Homepage