import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import siteService from '../../services/sites'
import { useDispatch } from 'react-redux'
import { toggleStatus, initSites, removeSite } from '../../reducers/sitesReducer'
import { setNotification } from '../../reducers/notifReducer'
import { initializeUsers } from '../../reducers/usersReducer'
import { Button, Link } from '@material-ui/core'

const SiteDetails = ({site, user}) => {
  const updateSite = async (siteId, siteObject) => {
    try {
      const updatedSite = await siteService.update(siteId, siteObject)
      dispatch(toggleStatus(siteId, updatedSite))
      // dispatch(setNotification(`One like added to ${updatedSite.title}`))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification("Could not update site"))
    }
  }

  const dispatch = useDispatch()
  const likedList = site?.userLiked.find(n => n?.username === user.username)
  useEffect(() => {
    if (!likedList) {
      const newUser = { username: user.username, liked: false }
      const updatedArray = site.userLiked.concat(newUser)
      const updatedSite = {...site, userLiked: updatedArray}
      updateSite(site.id, updatedSite)
    }  
  },[])

  const visitedList = site.userVisited.find(n => n.username === user.username)

  useEffect(() => {
    if (!visitedList) {
      const newUser = { username: user.username, visited: false }
      const updatedArray = site.userVisited.concat(newUser)
      const updatedSite = {...site, userVisited: updatedArray}
      updateSite(site.id, updatedSite)  
    }  
  },[])
  const liked = likedList?.liked
  const visited = visitedList?.visited

  const deleteSite = async (siteId) => {
    try {
      const response = await siteService.remove(siteId)
      if (response.status === 204) {
        dispatch(removeSite(siteId))
        dispatch(initializeUsers())
        dispatch(setNotification(`Site ${site.title} deleted`))
      } else {
        dispatch(setNotification("Could not delete site"))
      }
    } catch (exception) {
      dispatch(setNotification("Could not delete site"))
    }
  }


  const handleLike = async () => {
    const indexCurr = site.userLiked.indexOf(likedList)
    //updatedSite is the parent site. This will have its liked status toggled
    //actually updatedUserLiked can simply use username: user.username and liked: true
    const updatedUserLiked = { username: likedList?.username, liked: !likedList.liked}
    site.userLiked[indexCurr] = updatedUserLiked
    const updatedSite = {...site, userLiked: site.userLiked}    
    updateSite(site.id, updatedSite)
    //childSite is the spawned from the parent, 
    //it will contain a parent, which is the updatedSite
    const childSite = {...site, parent: updatedSite, opcode: 100}
    const newSite = await siteService.create(childSite)
    // dispatch(createSite(newSite))
    dispatch(initializeUsers())
    dispatch(initSites())
  }

  const handleVisited = async () => {
    const indexCurr = site.userVisited.indexOf(visitedList)
    const updatedUserVisited = { username: visitedList?.username, visited: !visitedList.visited}
    site.userVisited[indexCurr] = updatedUserVisited
    const updatedSite = {...site, userVisited: site.userVisited}
    updateSite(site.id, updatedSite)
    const childSite = {...site, parent: updatedSite, opcode: 200}
    const newSite = await siteService.create(childSite)
    // dispatch(createSite(newSite))
    dispatch(initializeUsers())
    dispatch(initSites())
  }


  const handleDelete = () => {
    if (window.confirm(`Remove site ${site.title} by ${site.author}?`)) {
      deleteSite(site.id)
    }
  }
  return (
    <div className='site-details'>
      <Link href={site.url}>{site.url}</Link>
      <h2>
        {site.likes}
        <Button 
          size='small' variant='contained' 
          color={liked ? 'secondary' : 'primary'} 
          onClick={!liked ? handleLike : null} className='site-like'>{liked ? 'Already Liked' : "like"}
        </Button>
        <Button 
          size='small' variant='contained' 
          color={visited ? 'secondary' : 'primary'} 
          onClick={!visited ? handleVisited : null} className='site-like'>{visited ? 'Already Visited!' : "Visit"}
        </Button>
      </h2>
      <p>{site.description}</p>
      <img src={site.imageUrl} alt={"Image could not be loaded"} />
      <Button size='small' variant='contained' color='inherit' onClick={handleDelete}>remove</Button>
    </div>
  )
}

SiteDetails.propTypes = {
  site: PropTypes.object.isRequired,
}

export default SiteDetails
