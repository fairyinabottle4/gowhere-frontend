import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notifReducer from './reducers/notifReducer'
import blogsReducer from './reducers/blogsReducer'
import currUserReducer from './reducers/currUserReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    notification: notifReducer,
    currUser: currUserReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store