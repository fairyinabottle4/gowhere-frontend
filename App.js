import React, { useEffect, useRef } from 'react'
import SiteList from './components/Listings/SiteList'
import Regions from './components/Listings/RegionList'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import About from './components/About'
import Togglable from './components/Listings/Togglable'
import siteService from './services/sites'
import Homepage from './components/Homepage/Homepage'
import { useDispatch, useSelector } from 'react-redux'
import Search from './components/Search'

import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from "react-router-dom"
import { setCurrUser } from './reducers/currUserReducer'
import { initSites } from './reducers/sitesReducer'
import { initializeUsers } from './reducers/usersReducer'

import Container from '@material-ui/core/Container'
import RegionList from './components/Listings/RegionList'

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
              <div style={topStyle}>
                <h2 style={headerStyle}>Unesco go where?</h2>
                <p style={usernameStyle}>{user.name} logged in</p>
                <button onClick={handleLogout} style={logoutStyle}>logout</button>
              </div>
              <Menu />
              <Switch>
                <Route path='/sites'>
                  <RegionList user={user}/>
                </Route>
                <Route path='/about'>
                  <About />
                </Route>
                <Route path='/search'>
                  <Search user={user} />
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

const topStyle = {
  border: '2px solid red',
  display: 'flex',
  backgroundColor: '#81d4fa'
}

const headerStyle = {
  border: '2px solid red',
  color: 'black',
  fontStyle: 'italic',
  flexGrow: 1,
  fontSize: '24px'
}

const usernameStyle = {
  border: '2px solid red',
  paddingTop: '1em'
}

const logoutStyle = {
  backgroundColor: '#81d4fa',
  height: '50%',
  marginTop: '2em',
  border: '2px solid red',
  textAlign: 'center',
  color: 'blue'
}

export default App
