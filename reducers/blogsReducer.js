import blogService from '../services/blogs'

const reducer = (state = [], action) => {  
    switch(action.type) {
      case 'INCREMENT':
        const id = action.data.id
        const toChange = state.find(n => n.id === id)
        const changedBlog = {
          ...toChange,
          likes: toChange.likes + 1
        }
        return state.map(a => a.id !== id ? a : changedBlog)
      case 'NEW_BLOG':
        return [...state, action.data].sort((a,b) => a.votes-b.votes)
      case 'INIT_BLOGS':
        return action.data  
      case 'DELETE_BLOG':
        return state.filter(b => b.id !== action.data.id)
      default:
        return state
    }
}

export const addLike = (id) => {
  return async dispatch => {
    dispatch({
      type: 'INCREMENT',
      data: { id }
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs  
    })
  }
}

export const createBlog = (newBlog) => {
  //if the content is blank? Maybe do something?
  return async dispatch => {
    //send the data to the server first then change the state of the store
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
} 

export const removeBlog = (id) => {
  console.log("hello")
  return async dispatch => {
    dispatch({
      type: 'DELETE_BLOG',
      data: { id }
    })
  }
}
    
export default reducer