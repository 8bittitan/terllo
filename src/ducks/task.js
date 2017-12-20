import { gql } from 'react-apollo'

export const addTaskMutation = gql`
  mutation createTask($listId: String!, $text: String!) {
    createTask(listId: $listId, text: $text) {
      success
      task {
        _id
        text
        completed
      }
    }
  }
`

export const completeTaskMutation = gql`
  mutation completeTask($id: String!, $completed: Boolean!) {
    completeTask(id: $id, completed: $completed) {
      _id
      text
      completed
    }
  }
`

export const completeTask = (mutate, variables) =>
  new Promise((resolve, reject) => {
    mutate({ variables })
      .then((data) => {
        const tasks = data.data.completeTask

        resolve(tasks)
      })
      .catch((err) => {
        reject(err)
      })
  })

export const addTask = (mutate, variables) =>
  new Promise((resolve, reject) => {
    mutate({ variables })
      .then((data) => {
        const { data: { createTask: { task } } } = data
        resolve(task)
      })
      .catch((err) => {
        reject(err)
      })
  })
