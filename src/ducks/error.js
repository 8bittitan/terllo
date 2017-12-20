export const SET_ERROR = 'error/terllo/set_error'
const CLEAR_ERROR = 'error/terllo/clear_error'

const initialState = {
  status: 0,
  message: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR: {
      const { status, message } = action.payload

      return {
        ...state,
        status,
        message,
      }
    }

    case CLEAR_ERROR: {
      return {
        ...state,
        status: 0,
        message: '',
      }
    }

    default: {
      return state
    }
  }
}

export const setError = error => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: error,
  })

  setTimeout(() => {
    dispatch({
      type: CLEAR_ERROR,
    })
  }, 2000)
}

export const clearError = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  })
}
