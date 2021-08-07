import React, { useEffect, useState } from 'react'
import siteService from '../../services/sites'
import { useDispatch } from 'react-redux'
import { initSites } from '../../reducers/sitesReducer'
import { setNotification } from '../../reducers/notifReducer'
import { initializeUsers } from '../../reducers/usersReducer'
import { Button } from '@material-ui/core'


const LikeButton = React.forwardRef((props, ref) => {
  
  const dispatch = useDispatch()
  const likedList = props.site?.userLiked.find(n => n?.username === props.user.username)
  useEffect(() => {
    if (!likedList) {
      const newUser = { username: props.user.username, liked: false }
      const updatedArray = props.site.userLiked.concat(newUser)
      const updatedSite = {...props.site, userLiked: updatedArray}
      props.updateSite(props.site.id, updatedSite)
    }  
  },[])

  const [liked, setLiked] = useState(likedList?.liked)

  const handleLike = async () => {
    const indexCurr = props.site.userLiked.indexOf(likedList)
    //updatedSite is the parent site. This will have its liked status toggled
    //actually updatedUserLiked can simply use username: user.username and liked: true
    const updatedUserLiked = { username: likedList?.username, liked: !likedList?.liked}
    props.site.userLiked[indexCurr] = updatedUserLiked
    const updatedSite = {...props.site, userLiked: props.site.userLiked}    
    props.updateSite(props.site.id, updatedSite)
    //childSite is the spawned from the parent, 
    //it will contain a parent, which is the updatedSite
    const childSite = {...props.site, parent: updatedSite, opcode: 100}
    const newSite = await siteService.create(childSite)
    dispatch(initializeUsers())
    setLiked(!liked)
  }


  return (
    <Button 
      size='small' variant='contained' 
      color={liked ? 'secondary' : 'primary'} 
      onClick={!liked ? handleLike : null} className='site-like'>{liked ? 'Already Liked' : "like"}
    </Button>
  )
})

export default LikeButton