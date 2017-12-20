import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import error from './error'
import user from './user'

export default combineReducers({
  error,
  user,
  router: routerReducer,
})
