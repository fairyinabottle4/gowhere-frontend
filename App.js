import React, { useEffect, useRef } from 'react'
import SiteList from './components/Listings/SiteList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import About from './components/About'
import Togglable from './components/Listings/Togglable'
import siteService from './services/sites'
import Homepage from './components/Homepage/Homepage'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from "react-router-dom"
import { setCurrUser } from './reducers/currUserReducer'
import { initSites } from './reducers/sitesReducer'
import { initializeUsers } from './reducers/usersReducer'

import Container from '@material-ui/core/Container'

const App = () => {
  const user = useSelector(state => state.currUser)
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initSites())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedSiteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setCurrUser(user))
      siteService.setToken(user.token)
    }
  }, [])  

  const handleLogout = () => {
    window.localStorage.removeItem('loggedSiteappUser')
    window.localStorage.clear()
    dispatch(setCurrUser(null))
    return <LoginForm />
  }
  
  return (
    <Router>
      <Container>
        <div>
          {notification !== '' ? <Notification /> : null}
          {user === null ?
            <LoginForm /> :
            <div>
              <h2>sites</h2>
              <Menu />
              <p>{user.name} logged in</p>
              <button onClick={handleLogout}>logout</button>
              <Switch>
                <Route path='/sites'>
                  <SiteList user={user}/>
                </Route>
                <Route path='/about'>
                  <About />
                </Route>
                <Route path='/'>
                  <Homepage user={user} />
                </Route>
              </Switch>
            </div>
          }
      </div>

      </Container>

    </Router>
  )
}

export default App
