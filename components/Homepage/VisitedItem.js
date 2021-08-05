import siteService from '../../services/sites'
import { toggleStatus, createSite, removeSite } from '../../reducers/sitesReducer'
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

  const updateSite = async (siteId, siteObject) => {
    try {
      const updatedSite = await siteService.update(siteId, siteObject)
      dispatch(toggleStatus(siteId, updatedSite))
      // dispatch(setNotification(`One like added to ${updatedSite.title}`))
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
      dispatch(setNotification(`Site removed from visited list`))
    } else {
        dispatch(setNotification('could not remove'))
    }
    } catch (exception) {
        dispatch(setNotification(exception))
    }
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove site ${visitedPlace.title}?`)) {
      const original = await siteService.getSingle(parent.id)
      const tempLiked = original.userLiked.find(n => n.username === user.username)
      const currLikedStatus = tempLiked.liked
      const indexLiked = original.userLiked.indexOf(tempLiked)
      const updatedUserVisited = { username: user.username, visited: false}
      const updatedUserLiked = { username: user.username, liked: currLikedStatus}
      original.userLiked[indexLiked] = updatedUserLiked
      parent.userVisited[indexCurr] = updatedUserVisited
      const updatedParentSite = {...parent, userLiked: original.userLiked, userVisited: parent.userVisited}
      updateSite(parent.id, updatedParentSite)
      deleteSite(visitedPlaceId)
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