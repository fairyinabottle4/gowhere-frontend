const notifReducer = (state = '', action) => {
  switch(action.type) {
    case 'SET_NOTIF':
      return action.data
    case 'REMOVE':
      return null    
    default:
      return state
    }
  }
  
  export const setNotification = (content) => {
    const duration = 5
    if (window.notificationTimeout) {
      window.clearTimeout(window.notificationTimeout)
    }
  
    return async (dispatch) => {
      dispatch({
        type: 'SET_NOTIF',
        data: content  
      })
      window.notificationTimeout = setTimeout(() => {
        dispatch(removeNotif())
      }, duration * 1000)
    }
  }
  
  export const removeNotif = () => {
    return {type : 'REMOVE'}
  }
  
  export default notifReducer