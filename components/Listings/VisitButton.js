import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import siteService from '../../services/sites'
import { useDispatch } from 'react-redux'
import { toggleStatus, initSites } from '../../reducers/sitesReducer'
import { setNotification } from '../../reducers/notifReducer'
import { initializeUsers } from '../../reducers/usersReducer'
import { Button, Link } from '@material-ui/core'


const VisitButton = ({site, user, updateSite}) => {

  const visitedList = site.userVisited.find(n => n.username === user.username)

  const dispatch = useDispatch()
  useEffect(() => {
    if (!visitedList) {
      const newUser = { username: user.username, visited: false }
      const updatedArray = site.userVisited.concat(newUser)
      const updatedSite = {...site, userVisited: updatedArray}
      updateSite(site.id, updatedSite)  
    }  
  },[])
  const visited = visitedList?.visited

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

  return (
    <Button 
      size='small' variant='contained' 
      color={visited ? 'secondary' : 'primary'} 
      onClick={!visited ? handleVisited : null} className='site-like'>{visited ? 'Already Visited!' : "Visit"}
    </Button>

  )
}

export default VisitButton