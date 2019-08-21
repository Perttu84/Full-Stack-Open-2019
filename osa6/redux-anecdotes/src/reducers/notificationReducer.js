const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
    return action.data
    default: return state
  }
}

export const setMessage = (message, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: message,
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_MESSAGE',
        data: null,
      })
    }, timeout*1000)
  }
}

export default notificationReducer