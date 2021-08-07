import siteService from '../services/sites'

const reducer = (state = [], action) => {  
  switch(action.type) {
    case 'TOGGLE_STATUS':
      const id = action.data.id
      const changedSite = action.data.newSite
      return state.map(a => a.id !== id ? a : changedSite)
    case 'NEW_SITE':
      return [...state, action.data].sort((a,b) => a.votes-b.votes)
    case 'INIT_SITES':
      return action.data
    case 'DELETE_SITE':
      return state.filter(b => b.id !== action.data.id)
    case 'ADD_COMMENT':
      const newID = action.data.id
      const newSite = action.data.changedSite
      return state.map(a => a.id !== newID ? a : newSite)
    default:
      return state
  }
}

export const toggleStatus = (id, newSite) => {
  return async dispatch => {
    dispatch({
      type: 'TOGGLE_STATUS',
      data: { id, newSite }
    })
  }
}

export const updateComment = (id, changedSite) => {
  return async dispatch => {
    dispatch({
      type: 'ADD_COMMENT',
      data: { id, changedSite }
    })
  }
}

export const initSites = () => {
  return async dispatch => {
    const sites = await siteService.getAll()
    dispatch({
      type: 'INIT_SITES',
      data: sites  
    })
  }
}

export const createSite = (newSite) => {
  return async dispatch => {
    //send the data to the server first then change the state of the store
    dispatch({
      type: 'NEW_SITE',
      data: newSite
    })
  }
} 

export const removeSite = (id) => {
  return async dispatch => {
    dispatch({
      type: 'DELETE_SITE',
      data: { id }
    })
  }
}
    
export default reducer