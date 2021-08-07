import siteService from '../../services/sites'
import { toggleStatus, removeSite } from '../../reducers/sitesReducer'
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

  const updateSite = async (siteId, siteObject) => {
    try {
      const updatedSite = await siteService.update(siteId, siteObject)
      dispatch(toggleStatus(siteId, updatedSite))
    } catch (exception) {
      dispatch(setNotification("Could not update site"))
    }
  }

  const deleteSite = async (siteId) => {
    try {
      const response = await siteService.remove(siteId)
    if (response.status === 204) {
      dispatch(removeSite(siteId))
      dispatch(initializeUsers())
      dispatch(setNotification(`Site removed from liked list`))
    } else {
        dispatch(setNotification('could not remove'))
    }
    } catch (exception) {
    dispatch(setNotification("Could not remove"))
    }
  }


  const handleDelete = async () => {
      if (window.confirm(`Remove site ${likedPlace.title}?`)) {
        const original = await siteService.getSingle(parent.id)
        const tempVisited = original.userVisited.find(n => n.username === user.username)
        const currVisitStatus = tempVisited.visited
        const indexVisited = original.userVisited.indexOf(tempVisited)
        const updatedUserVisited = { username: user.username, visited: currVisitStatus}
        const updatedUserLiked = { username: user.username, liked: false}
        parent.userLiked[indexCurr] = updatedUserLiked
        original.userVisited[indexVisited] = updatedUserVisited
        const updatedParentSite = {...parent, userLiked: parent.userLiked, userVisited: original.userVisited}
        updateSite(parent.id, updatedParentSite)
        deleteSite(likedPlaceId)
      }
  }

  return (
    <div style={likedContainer}>
      <p style={title}>{likedPlace.title}</p>
      <Button onClick={handleDelete} size='small'
        variant='contained' color={'secondary'}>remove from likes
      </Button>
    </div>
  )
}

export default LikedItem

const likedContainer = {
  borderTop: '2px solid',
  overflowX: 'hidden',
  overflowY: 'auto',
}

const title = {
  flexWrap: 'wrap',
  wordBreak: 'break-word',
  fontFamily: "Roboto"
}
