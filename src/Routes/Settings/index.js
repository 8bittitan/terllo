import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { updateUser, updateUserMutation } from '../../ducks/user'

import Button from '../../Components/Button'
import Input from '../../Components/Input'
import InputGroup from '../../Components/InputGroup'

class Settings extends Component {
  constructor() {
    super()

    this.updateUser = this.updateUser.bind(this)
  }

  updateUser(evt) {
    evt.preventDefault()

    const { usernameRef, passwordRef } = this
    const variables = {
      id: this.props.id,
    }

    if (usernameRef.value !== '') {
      variables.username = usernameRef.value
    }

    if (passwordRef.value !== '') {
      variables.password = passwordRef.value
    }

    updateUser(this.props.mutate, variables, this.props.dispatch)
  }

  render() {
    return (
      <form onSubmit={this.updateUser}>
        <InputGroup>
          <h1>Account Settings</h1>
        </InputGroup>
        <InputGroup>
          <label htmlFor="username">
            Username
            <Input
              type="text"
              name="username"
              reference={(ref) => {
                this.usernameRef = ref
              }}
              value={this.props.username}
            />
          </label>
        </InputGroup>
        <InputGroup>
          <label htmlFor="password">
            Password
            <Input
              type="password"
              placeholde="Update Password"
              name="password"
              reference={(ref) => {
                this.passwordRef = ref
              }}
            />
          </label>
        </InputGroup>
        <InputGroup>
          <Button type="submit" text="Save Settings" />
        </InputGroup>
      </form>
    )
  }
}

Settings.propTypes = {
  id: PropTypes.string,
  dispatch: PropTypes.func,
  mutate: PropTypes.func,
  username: PropTypes.string,
}

Settings.defaultProps = {
  id: '',
  dispatch: () => {},
  mutate: () => {},
  username: '',
}

const mapStateToProps = state => ({
  id: state.user._id,
  username: state.user.username,
})

export default connect(mapStateToProps)(graphql(updateUserMutation)(Settings))
