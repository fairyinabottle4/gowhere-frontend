import React, { useEffect } from 'react'
import siteService from '../../services/sites'
import { useDispatch } from 'react-redux'
import { initSites } from '../../reducers/sitesReducer'
import { setNotification } from '../../reducers/notifReducer'
import { initializeUsers } from '../../reducers/usersReducer'
import { Button } from '@material-ui/core'


const LikeButton = ({user, site, updateSite}) => {

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


  const liked = likedList?.liked

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


  return (
    <Button 
      size='small' variant='contained' 
      color={liked ? 'secondary' : 'primary'} 
      onClick={!liked ? handleLike : null} className='site-like'>{liked ? 'Already Liked' : "like"}
    </Button>
  )
}

export default LikeButton