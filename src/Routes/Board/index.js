import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import {
  boardQuery,
  deleteBoard,
  deleteBoardMutation,
  updateBoard,
  updateBoardMutation,
} from '../../ducks/board'
import {
  createList,
  createListMutation,
  deleteList,
  deleteListMutation,
  updateList,
  updateListMutation,
} from '../../ducks/list'

import CreateList from '../../Components/CreateList'
import Dropdown from '../../Components/Dropdown'
import Input from '../../Components/Input'
import List from '../../Components/List'

import './Board.css'

class Board extends Component {
  constructor() {
    super()

    this.state = {
      isCreatingList: false,
      isEdittingName: false,
    }

    this.createList = this.createList.bind(this)
    this.deleteBoard = this.deleteBoard.bind(this)
    this.deleteList = this.deleteList.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this)
    this.openCreateList = this.openCreateList.bind(this)
    this.showEditName = this.showEditName.bind(this)
    this.stopEditName = this.stopEditName.bind(this)
    this.updateBoard = this.updateBoard.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  createList(evt) {
    evt.preventDefault()

    createList(this.props.createListMutation, {
      name: this.listName.value,
      boardId: this.props.match.params.id,
    })
      .then(() => {
        this.setState(
          {
            isCreatingList: false,
          },
          () => {
            this.props.data.refetch()
          },
        )
      })
      .catch((err) => {
        console.log(err)
      })
  }

  deleteBoard(evt) {
    evt.preventDefault()

    deleteBoard(
      this.props.deleteBoardMutation,
      { id: this.props.match.params.id },
      this.props.dispatch,
    )
  }

  deleteList(id) {
    deleteList(this.props.deleteListMutation, { id })
      .then(() => {
        this.props.data.refetch()
      })
      .catch(() => {
        console.log('Something went wrong')
      })
  }

  handleColorChange(evt) {
    if (evt.which === 13 && this.colorRef.value !== '') {
      updateBoard(
        this.props.updateBoardMutation,
        { id: this.props.match.params.id, color: this.colorRef.value },
        this.props.dispatch,
      )
        .then(() => {
          this.props.data.refetch()
        })
        .catch(() => {
          console.log('Something went wrong!')
        })
    }
  }

  openCreateList() {
    this.setState({
      isCreatingList: true,
    })
  }

  showEditName() {
    this.setState(
      {
        isEdittingName: true,
      },
      () => {
        this.boardRef.focus()
      },
    )
  }

  stopEditName() {
    this.setState({
      isEdittingName: false,
    })
  }

  updateBoard(evt) {
    if (evt.which === 13) {
      if (this.boardRef.value !== '') {
        updateBoard(
          this.props.updateBoardMutation,
          { id: this.props.match.params.id, name: this.boardRef.value },
          this.props.dispatch,
        )
          .then(() => {
            this.setState(
              {
                isEdittingName: false,
              },
              () => {
                this.props.data.refetch()
              },
            )
          })
          .catch(() => {
            console.log('Something went wrong')
          })
      } else {
        this.setState({
          isEdittingName: false,
        })
      }
    }
  }

  updateList(id, name) {
    updateList(this.props.updateListMutation, { id, name }, this.props.dispatch)
      .then(() => {
        this.props.data.refetch()
      })
      .catch(() => {
        console.log('Something went wrong!')
      })
  }

  render() {
    const { data: { board, loading } } = this.props

    if (loading) {
      return <p>Loading...</p>
    }

    if (this.state.isCreatingList) {
      return (
        <CreateList
          submitHandler={this.createList}
          reference={(ref) => {
            this.listName = ref
          }}
        />
      )
    }

    const buttonText = board.lists.length > 0 ? 'Create New List' : 'Create Your First List'
    const Lists = board.lists.map(list => (
      <List
        key={list._id}
        {...list}
        color={board.color}
        deleteList={this.deleteList}
        updateList={this.updateList}
      />
    ))

    return (
      <div style={{ height: '100%' }}>
        <div className="Board__Header">
          <div className="Board__Title">
            {this.state.isEdittingName ? (
              <Input
                value={board.name}
                type="text"
                onKeydown={this.updateBoard}
                reference={(ref) => {
                  this.boardRef = ref
                }}
                onBlur={this.stopEditName}
              />
            ) : (
              <h1 onDoubleClick={this.showEditName}>{board.name}</h1>
            )}
          </div>

          <div className="Board__Settings">
            <Dropdown title="Board Settings" wide>
              <ul>
                <li>
                  <p>Change Board Color</p>
                  <Input
                    type="text"
                    value={board.color || '#1ea4c5'}
                    onKeydown={this.handleColorChange}
                    reference={(ref) => {
                      this.colorRef = ref
                    }}
                  />
                </li>
                <li>
                  <a href="#deleteBoard" onClick={this.deleteBoard}>
                    Delete Board
                  </a>
                </li>
              </ul>
            </Dropdown>
          </div>
        </div>
        <div className="Lists-Wrapper">
          <div className="Lists">
            {Lists}
            <button className="Button" onClick={this.openCreateList}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    )
  }
}

Board.propTypes = {
  createListMutation: PropTypes.func,
  deleteBoardMutation: PropTypes.func,
  deleteListMutation: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.shape({
    board: PropTypes.shape({
      name: PropTypes.string,
      _id: PropTypes.string,
    }),
    loading: PropTypes.bool.isRequired,
    refetch: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  updateBoardMutation: PropTypes.func,
  updateListMutation: PropTypes.func,
}

Board.defaultProps = {
  createListMutation: () => {},
  deleteBoardMutation: () => {},
  deleteListMutation: () => {},
  updateBoardMutation: () => {},
  updateListMutation: () => {},
}

export default connect()(compose(
  graphql(boardQuery, {
    options: ({ match: { params: { id } } }) => ({
      fetchPolicy: 'cache-and-network',
      variables: {
        id,
      },
    }),
  }),
  graphql(createListMutation, { name: 'createListMutation' }),
  graphql(deleteBoardMutation, { name: 'deleteBoardMutation' }),
  graphql(deleteListMutation, { name: 'deleteListMutation' }),
  graphql(updateBoardMutation, { name: 'updateBoardMutation' }),
  graphql(updateListMutation, { name: 'updateListMutation' }),
)(Board))
