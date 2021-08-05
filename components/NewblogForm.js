import React, { useState } from 'react'
import siteService from '../services/sites'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { createSite } from '../reducers/sitesReducer'
import { initializeUsers } from '../reducers/usersReducer'
import { Button, TextField } from '@material-ui/core'

const NewSiteForm = () => {

  const [newSiteTitle, setNewSiteTitle] = useState('')
  const [newSiteAuthor, setNewSiteAuthor] = useState('')
  const [newSiteUrl, setNewSiteUrl] = useState('')

  const dispatch = useDispatch()

  const addSite = async (event) => {
    event.preventDefault()
    const siteObject = {
      title: newSiteTitle,
      author: newSiteAuthor,
      url: newSiteUrl,
      comments: []
    }
    const newSite = await siteService.create(siteObject)
    dispatch(createSite(newSite))
    dispatch(initializeUsers())
    dispatch(setNotification(`A new site ${newSiteTitle} by ${newSiteAuthor}`))
    setNewSiteTitle('')
    setNewSiteAuthor('')
    setNewSiteUrl('')
  }

  const handleTitleChange = (event) => {
    setNewSiteTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewSiteAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewSiteUrl(event.target.value)
  }

  return (
  <form onSubmit={addSite} id="create">
    <div>
      <TextField     
        label='title' 
        value={newSiteTitle}
        onChange={handleTitleChange}
        id="Title">
      </TextField>
      <br/>
      <TextField         
        label='author'
        value={newSiteAuthor}
        onChange={handleAuthorChange}
        id="Author">
      </TextField>
      <br/>
      <TextField
        label='Url'
        value={newSiteUrl}
        onChange={handleUrlChange}
        id="Url">
      </TextField>
    </div>
    <Button variant='contained' color='primary' type="submit">create</Button>
  </form>  
)}

export default NewSiteForm
