import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LikedItem from './LikedItem'
import VisitedItem from './VisitedItem'
import { Button } from '@material-ui/core'
import { initializeUsers } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notifReducer'

const Homepage = (props) => {
  const currUser = props.user
  const users = useSelector(state => state.users)
  //find the id of the current user
  const userLikes = users?.jsonUser?.find(n => n.username === currUser.username)
  const userVisited = users?.jsonVisited?.find(n => n.username === currUser.username)

  const likedPlaces = userLikes?.liked
  const visitedPlaces = userVisited?.visited

  return (
    <div>
      <h2>Where would you like to go today?</h2>
      <p>You have liked {likedPlaces.length} / 1144 places</p>
      <p>You have visited {visitedPlaces.length} / 1144 places</p>
      <div style={homeContainer}>
        <div style={likeContainer}>
          <h2>Places I like</h2>
          {likedPlaces?.map(place => <LikedItem id={place.id} likedPlace={place} user={currUser}/>)}
        </div>
        <div>
          <h2>Places I visited</h2>
          {visitedPlaces?.map(place => <VisitedItem id={place.id} visitedPlace={place} user={currUser} />)}
        </div>
      </div>
    </div>
  )
}

export default Homepage

const homeContainer = {
  display: 'flex',
  border: '2px solid',
}

const likeContainer = {
  border: '2px solid',
}

const visitContainer = {
  border: '2px solid red',
}