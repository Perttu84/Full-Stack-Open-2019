const initialState = {
  message: null,
  type: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return {
      message: action.data.message,
      type: action.data.type
    }
  default: return state
  }
}

export const setMessage = (message, type, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: message,
        type: type
      }
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: {
          message: null,
          type: null
        }
      })
    }, timeout*1000)
  }
}

export default notificationReducer