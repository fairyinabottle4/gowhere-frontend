import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LikedItem from './LikedItems'
import VisitedItem from './VisitedItem'
import { Button } from '@material-ui/core'
import { initializeUsers } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notifReducer'

const Homepage = (props) => {
  const currUser = props.user
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  //find the id of the current user
  const userLikes = users?.jsonUser?.find(n => n.username === currUser.username)
  const userVisited = users?.jsonVisited?.find(n => n.username === currUser.username)

  const likedPlaces = userLikes?.blogs
  const visitedPlaces = userVisited?.visited

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