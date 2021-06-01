import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notifReducer'
import { createBlog } from '../reducers/blogsReducer'

const NewBlogForm = () => {

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = async (event) => {
    console.log(newBlogTitle)
    console.log(newBlogAuthor)
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    const newBlog = await blogService.create(blogObject)
    dispatch(createBlog(newBlog))
    dispatch(setNotification(`A new blog ${newBlogTitle} by ${newBlogAuthor}`, 5))
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  const handleTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  return (
  <form onSubmit={addBlog} id="create">
    <div>
      Title:
      <input
        value={newBlogTitle}
        onChange={handleTitleChange}
        id="Title"
      />
      <br/>
      Author:
      <input
        value={newBlogAuthor}
        onChange={handleAuthorChange}
        id="Author"
      />
      <br/>
      Url:
      <input
        value={newBlogUrl}
        onChange={handleUrlChange}
        id="Url"
      />
    </div>
    <button type="submit">create</button>
  </form>  
)}

export default NewBlogForm
