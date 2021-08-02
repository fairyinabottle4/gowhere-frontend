import {
  Table,
  TableBody,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'

const Homepage = (props) => {
  const currUser = props.user
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)
  //find the id of the current user
  const user = users.find(n => n.username === currUser.username)
  //liked places
  const likedPlaces = user.blogs
  //blogs will be visited places
  // const visitedPlaces = user.likedPlaces
  return (
    <div>
      <h2>Places I like</h2>
      {likedPlaces.map(place => <p key={place.id}>{place.title}</p>)}
    </div>
  )
}

export default Homepage