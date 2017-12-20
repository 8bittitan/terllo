import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import { clearError } from '../../ducks/error'
import { signup, signupMutation, setUser, setUserMutation } from '../../ducks/user'

import Button from '../../Components/Button'
import Input from '../../Components/Input'
import InputGroup from '../../Components/InputGroup'

class Signup extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
    }

    this.submitForm = this.submitForm.bind(this)
    this.updateInput = this.updateInput.bind(this)
  }

  componentDidMount() {
    const token = window.localStorage && window.localStorage.getItem('terllo_token')
    if (token) {
      setUser(this.props.setUser, { token }, this.props.dispatch)
    }
  }

  submitForm(evt) {
    evt.preventDefault()

    this.props.dispatch(clearError())

    const { username, password } = this.state

    signup(this.props.signup, { username, password }, this.props.dispatch)
  }

  updateInput(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  render() {
    const { errorStatus, errorMessage } = this.props

    return (
      <div>
        <InputGroup>
          <h1>Signup page!</h1>
        </InputGroup>
        <form onSubmit={this.submitForm}>
          {errorStatus !== 0 && (
            <InputGroup>
              <p className="error">{errorMessage}</p>
            </InputGroup>
          )}
          <InputGroup>
            <Input placeholder="Username" name="username" type="text" onChange={this.updateInput} />
          </InputGroup>
          <InputGroup>
            <Input
              placeholder="Password"
              name="password"
              type="password"
              onChange={this.updateInput}
            />
          </InputGroup>

          <Button text="Create Account" />
        </form>
      </div>
    )
  }
}

Signup.propTypes = {
  errorMessage: PropTypes.string,
  errorStatus: PropTypes.number,
  dispatch: PropTypes.func,
  setUser: PropTypes.func.isRequired,
  signup: PropTypes.func.isRequired,
}

Signup.defaultProps = {
  errorMessage: '',
  errorStatus: 0,
  dispatch: () => {},
}

const mapStateToProps = state => ({
  errorStatus: state.error.status,
  errorMessage: state.error.message,
})

export default connect(mapStateToProps)(compose(
  graphql(setUserMutation, { name: 'setUser' }),
  graphql(signupMutation, { name: 'signup' }),
)(Signup))
