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
  const user = users?.find(n => n.username === currUser.username)
  //liked places
  const likedPlaces = user?.blogs
  //blogs will be visited places
  // const visitedPlaces = user.likedPlaces

  const dispatch = useDispatch()

  return (
    <div>
      <h2>Places I like</h2>
      {likedPlaces?.map(place => <LikedItem id={place.id} likedPlace={place} />)}
    </div>
  )
}

export default Homepage