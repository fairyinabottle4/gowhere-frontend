import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import NewblogForm from './components/NewblogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notifReducer'
import { setCurrUser, loginUser } from './reducers/currUserReducer'
import { addLike, initBlogs, createBlog, removeBlog } from './reducers/blogsReducer'


const App = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const user = useSelector(state => state.currUser)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setCurrUser(user))
      blogService.setToken(user.token)
    }
  }, [])  

  const blogFormRef = useRef()

  const addBlog = async (event) => {
    blogFormRef.current.toggleVisibility()
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



  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <NewblogForm
        addBlog={addBlog}
        newBlogTitle={newBlogTitle}
        newBlogAuthor={newBlogAuthor}
        newBlogUrl={newBlogUrl}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
      />

    </Togglable>
  )

  const handleLogout = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.localStorage.clear()
    dispatch(setCurrUser(null))
    return <LoginForm />
  }


  return (
    <div>
      <Notification />

      {user === null ?
        <LoginForm /> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <BlogList />
          <h2>create new</h2>
          {blogForm()}

        </div>
      }

    </div>
  )
}

export default App
