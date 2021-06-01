import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import notifReducer from './reducers/notifReducer'
import blogsReducer from './reducers/blogsReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    notification: notifReducer,
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
))

export default store