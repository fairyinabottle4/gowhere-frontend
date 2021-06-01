import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import NewblogForm from './components/NewblogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrUser } from './reducers/currUserReducer'
import { initBlogs } from './reducers/blogsReducer'


const App = () => {
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

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <NewblogForm />

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
