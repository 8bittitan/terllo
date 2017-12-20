import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'

import { addTask, addTaskMutation, completeTask, completeTaskMutation } from '../../ducks/task'

import Dropdown from '../Dropdown'
import Input from '../Input'
import Task from '../Task'

import './List.css'

class List extends Component {
  constructor() {
    super()

    this.state = {
      isUpdatingName: false,
      tasks: [],
    }

    this.deleteList = this.deleteList.bind(this)
    this.handleTaskComplete = this.handleTaskComplete.bind(this)
    this.handleTaskInput = this.handleTaskInput.bind(this)
    this.startUpdatingName = this.startUpdatingName.bind(this)
    this.updateList = this.updateList.bind(this)
  }

  componentWillMount() {
    this.setState({
      tasks: this.state.tasks.concat(this.props.tasks),
    })
  }

  deleteList(evt) {
    evt.preventDefault()

    this.props.deleteList(this.props._id)
  }

  handleTaskComplete(id, complete) {
    const variables = {
      id,
      completed: !complete,
    }

    completeTask(this.props.completeTaskMutation, variables)
      .then((tasks) => {
        this.setState({
          tasks,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleTaskInput(evt) {
    if (evt.which === 13 && this.taskRef.value !== '') {
      addTask(this.props.addTaskMutation, { text: this.taskRef.value, listId: this.props._id })
        .then((task) => {
          this.setState({
            tasks: this.state.tasks.concat(task),
          })

          this.taskRef.value = ''
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  startUpdatingName() {
    this.setState({
      isUpdatingName: true,
    })
  }

  updateList(evt) {
    if (evt.which === 13 && this.listName.value !== '') {
      this.props.updateList(this.props._id, this.listName.value)
    }
  }

  render() {
    const { name, color } = this.props
    let Tasks = []

    if (this.state.tasks.length > 0) {
      Tasks = this.state.tasks.map(task => (
        <Task key={task._id} handleChange={this.handleTaskComplete} {...task} />
      ))
    }

    return (
      <div className="List">
        <div className="List__Heading" style={{ backgroundColor: color }}>
          <div className="List__Heading__Name">
            {this.state.isUpdatingName ? (
              <Input
                type="text"
                value={name}
                onKeydown={this.updateList}
                reference={(ref) => {
                  this.listName = ref
                }}
              />
            ) : (
              <h3 onDoubleClick={this.startUpdatingName}>{name}</h3>
            )}
          </div>

          <Dropdown title="..." superwide>
            <ul>
              <li>
                <a href="#deleteList" onClick={this.deleteList}>
                  Delete List
                </a>
              </li>
            </ul>
          </Dropdown>
        </div>
        <div className="List__Tasks">
          {this.state.tasks.length > 0 && Tasks}

          <Input
            type="text"
            placeholder="New Task"
            onKeydown={this.handleTaskInput}
            reference={(ref) => {
              this.taskRef = ref
            }}
          />
        </div>
      </div>
    )
  }
}

List.propTypes = {
  addTaskMutation: PropTypes.func,
  color: PropTypes.string,
  completeTaskMutation: PropTypes.func,
  deleteList: PropTypes.func.isRequired,
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    text: PropTypes.string,
  })),
  updateList: PropTypes.func.isRequired,
}

List.defaultProps = {
  addTaskMutation: () => {},
  color: '',
  completeTaskMutation: () => {},
  tasks: [],
}

export default compose(
  graphql(addTaskMutation, { name: 'addTaskMutation' }),
  graphql(completeTaskMutation, { name: 'completeTaskMutation' }),
)(List)
