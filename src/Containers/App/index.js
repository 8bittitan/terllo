import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { history } from '../../store'

import Container from '../../Components/Container'
import Header from '../Header'
import makeRoutes from '../../Routes'

import './App.css'

const App = ({ userId }) => {
  const Routes = makeRoutes({ React, Route, Redirect })(userId)

  return (
    <ConnectedRouter history={history}>
      <div className="App">
        <Header />
        <Container>
          <Switch>{Routes}</Switch>
        </Container>
      </div>
    </ConnectedRouter>
  )
}

App.propTypes = {
  userId: PropTypes.string,
}

App.defaultProps = {
  userId: '',
}

const mapStateToProps = state => ({
  userId: state.user._id,
})

export default connect(mapStateToProps)(App)
