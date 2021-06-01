import React, { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import NewblogForm from './components/NewblogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login' 
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notifReducer'
import { setCurrUser, loginUser } from './reducers/currUserReducer'
import { addLike, initBlogs, createBlog, removeBlog } from './reducers/blogsReducer'


const App = () => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  //user state needs to go into redux store
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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

  const updateBlog = async (blogId, blogObject) => {
    try {
      const updatedBlog = await blogService.update(blogId, blogObject)
      dispatch(addLike(blogId, blogObject))
      // setMessage(`A new blog ${newBlogTitle} by ${newBlogAuthor}`)
      // setTimeout(() => {
      //   setMessage(null)
      // }, 5000)
    } catch (exception) {
      dispatch(setNotification("Could not update blog", 5))
    }
  }

  const deleteBlog = async (blogId) => {
    try {
      const response = await blogService.remove(blogId)
      console.log(response.status)
      if (response.status === 204) {
        dispatch(removeBlog(blogId))
        // setMessage(`Blog deleted`)
        // setTimeout(() => {
        //   setMessage(null)
        // }, 5000)  
      } else {
        dispatch(setNotification("Could not delete blog", 5))
      }
    } catch (exception) {
      dispatch(setNotification("Could not delete blog", 5))
    }
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


  const handleLogin = (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    console.log(username)
    console.log(password)
    dispatch(loginUser(username, password))
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
    setUser(null)
    return <LoginForm handleLogin={handleLogin} />
  }


  return (
    <div>
      <Notification />

      {user === null ?
        <LoginForm handleLogin={handleLogin} /> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          <BlogList updateBlog={updateBlog} deleteBlog={deleteBlog}/>
          <h2>create new</h2>
          {blogForm()}

        </div>
      }

    </div>
  )
}

export default App
