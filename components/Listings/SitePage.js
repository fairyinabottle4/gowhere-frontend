import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  useParams,
  Redirect
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import siteService from '../../services/sites'
import { Link, Button, TextField } from '@material-ui/core'  
import { updateComment } from '../../reducers/sitesReducer'

const SitePage = () => {
  const [newComment, setNewComment] = useState('')
  
  const dispatch = useDispatch()
  //possible bug here, need to refesh the list of sites
  const sites = useSelector(state => state.sites)

  const id = useParams().id
  const site = sites.find(n => n.id === id)

  const handleNewComment = (event) => {
    setNewComment(event.target.value)
  }

  const addComment = async (event) => {
    event.preventDefault()
    const siteObject = {
      ...site, 
      comments: site.comments.concat(newComment)
    }
    const newSite = await siteService.update(id, siteObject)
    dispatch(updateComment(id, newSite))
    setNewComment('')
  }
  if (!site) {
    return <Redirect to="/sites" />
  }
  return (
    <div>
      <h2>{site.title} by {site.author}</h2>
      <Link href={site.url}>{site.url}</Link>
      <p>added by {site.user.name}</p>
      <h3>comments</h3>
      <form onSubmit={addComment}>
        <div>
          <TextField 
            label='comment' 
            value={newComment} 
            onChange={handleNewComment} 
            id='comment'>
          </TextField>
        </div>
      <Button variant='contained' size='small' color='primary' type='submit'>add comment</Button>  
      </form>
      {site.comments.map(comment => <li>{comment}</li>)}
    </div>
  )
}


  export default SitePage