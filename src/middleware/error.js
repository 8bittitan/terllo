import { SET_ERROR } from '../ducks/error'

const createErrorMiddleware = () => () => next => (action) => {
  if (action.payload && action.payload.status && action.payload.status !== 0) {
    const newAction = Object.assign({}, action, { type: SET_ERROR })
    return next(newAction)
  }

  return next(action)
}

export default createErrorMiddleware()
