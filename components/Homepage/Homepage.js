import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LikedItem from './LikedItem'
import VisitedItem from './VisitedItem'
import { Button } from '@material-ui/core'
import { initializeUsers } from '../../reducers/usersReducer'
import { setNotification } from '../../reducers/notifReducer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCheckSquare } from '@fortawesome/free-solid-svg-icons'


const Homepage = (props) => {
  const currUser = props.user
  const users = useSelector(state => state.users)
  //find the id of the current user
  const userLikes = users?.jsonUser?.find(n => n.username === currUser.username)
  const userVisited = users?.jsonVisited?.find(n => n.username === currUser.username)
  const likedPlaces = userLikes?.liked ?? []
  const visitedPlaces = userVisited?.visited ?? []

  return (
    <div>
      <h2 style={titleStyle}>Where would you like to go today?</h2>
      <div style={likedStatsContainer}>
        <p style={likedStats}>You have liked {likedPlaces?.length} / 1144 places</p>
        {likedPlaces.length === 0 ? <p>There's something for everyone here!</p> : 
            likedPlaces.length < 10 ? <p> Have you planned your next trip?</p>
            : <p>Woah explorer! Take it easy!</p>}
      </div>
      <div style={likedStatsContainer}>
        <p style={likedStats}>You have visited {visitedPlaces?.length} / 1144 places</p>
        {visitedPlaces.length === 0 ? <p>A great journey begins with a single step!</p>
            : visitedPlaces.length < 500 ? <p>Making good progress, traveller!</p> 
            : <p>You could write a book now!</p>}
      </div>
      <div style={homeContainer}>
        <div style={likeContainer}>
          <div>
            <h2 style={likedPlacesTitle}>Places I like <FontAwesomeIcon icon={faHeart}/></h2>
          </div>
          {likedPlaces?.map(place => <LikedItem id={place.id} likedPlace={place} user={currUser}/>)}
        </div>
        <div style={visitContainer}>
          <h2 style={visitedPlacesTitle}>Places I visited <FontAwesomeIcon icon={faCheckSquare}/></h2>
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
  backgroundColor: '#ffc4ff',
  flexGrow: 1
}

const titleStyle = {
  fontFamily: "Roboto"
}

const visitContainer = {
  border: '2px solid red',
  backgroundColor: '#66ffa6',
  flexGrow: 1
}

const likedPlacesTitle = {
  backgroundColor: '#ce93d8',
  fontFamily: "Roboto",
  textAlign: 'center'
}

const visitedPlacesTitle = {
  textAlign: 'center',
  backgroundColor: '#00e676',
  fontFamily: "Roboto"
}

const likedStatsContainer = {
  display: 'flex'
}

const likedStats = {
  marginRight: '10em',
  fontFamily: "Roboto"
}

const likedStatsComments = {

}