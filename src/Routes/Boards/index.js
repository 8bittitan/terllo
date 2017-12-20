import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

import { boardsQuery } from '../../ducks/board'

import Board from '../../Components/Board'
import CreateBoard from '../../Containers/CreateBoard'

import './Boards.css'

class Boards extends Component {
  constructor() {
    super()

    this.state = {
      isCreatingNewBoard: false,
    }

    this.cancleCreateBoard = this.cancleCreateBoard.bind(this)
    this.openCreateBoard = this.openCreateBoard.bind(this)
    this.selectBoard = this.selectBoard.bind(this)
  }

  cancleCreateBoard() {
    this.setState({
      isCreatingNewBoard: false,
    })
  }

  openCreateBoard() {
    this.setState({
      isCreatingNewBoard: true,
    })
  }

  selectBoard(id) {
    this.props.history.push(`/board/${id}`)
  }

  render() {
    const { isCreatingNewBoard } = this.state
    const { data } = this.props

    if (data.loading) {
      return <p>Loading...</p>
    }

    if (isCreatingNewBoard) {
      return <CreateBoard onCancle={this.cancleCreateBoard} />
    }

    const BoardsList = data.boards.map(board => (
      <Board key={board._id} onClick={this.selectBoard} {...board} />
    ))

    return (
      <div>
        <h1>Personal Boards</h1>
        <div className="Boards">
          {data.boards.length > 0 && BoardsList}
          <Board
            customClass="Board--default"
            onClick={this.openCreateBoard}
            name="Create a Board"
          />
        </div>
      </div>
    )
  }
}

Boards.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    boards: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
    })),
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
}

Boards.defaultProps = {
  data: {
    loading: false,
    boards: [],
  },
}

export default graphql(boardsQuery, {
  options: {
    fetchPolicy: 'cache-and-network',
  },
})(Boards)
