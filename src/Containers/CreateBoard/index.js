import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { createBoard, createBoardMutation } from '../../ducks/board'

import Button from '../../Components/Button'
import InputGroup from '../../Components/InputGroup'
import Input from '../../Components/Input'

class CreateBoard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateBoardName = this.updateBoardName.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()

    const { name } = this.state

    createBoard(this.props.mutate, { name }, this.props.dispatch)
  }

  updateBoardName(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    })
  }

  render() {
    const { onCancle } = this.props

    return (
      <div>
        <InputGroup>
          <h1>Create Board</h1>
        </InputGroup>
        <form onSubmit={this.handleSubmit}>
          <InputGroup>
            <Input
              placeholder="Board Name"
              name="name"
              type="text"
              onChange={this.updateBoardName}
            />
          </InputGroup>

          <Button text="Create Board" />
          <Button text="Cancel" customClass="link" onClick={onCancle} type="button" />
        </form>
      </div>
    )
  }
}

CreateBoard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  mutate: PropTypes.func.isRequired,
  onCancle: PropTypes.func.isRequired,
}

export default connect()(graphql(createBoardMutation)(CreateBoard))
