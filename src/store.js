import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import errorMiddleware from './middleware/error'

import reducers from './ducks'

export const history = createHistory()

const router = routerMiddleware(history)

let middleware
if (NODE_ENV === 'production') {
  middleware = applyMiddleware(router, thunk, errorMiddleware)
} else {
  middleware = applyMiddleware(router, thunk, logger, errorMiddleware)
}

const enhancer = compose(
  middleware,
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined'
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f,
)

export default () => {
  const store = createStore(reducers, enhancer)

  return store
}
