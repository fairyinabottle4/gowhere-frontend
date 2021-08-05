import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notifReducer from './reducers/notifReducer'
import sitesReducer from './reducers/sitesReducer'
import currUserReducer from './reducers/currUserReducer'
import userReducer from './reducers/usersReducer'

const reducer = combineReducers({
  sites: sitesReducer,
  notification: notifReducer,
  currUser: currUserReducer,
  users: userReducer
})

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
))

export default store