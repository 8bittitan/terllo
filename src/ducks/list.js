import { gql } from 'react-apollo'

export const createListMutation = gql`
  mutation createList($name: String!, $boardId: String!) {
    createList(name: $name, boardId: $boardId) {
      _id
      name
      tasks {
        _id
        text
      }
    }
  }
`

export const createList = (mutate, variables) =>
  new Promise((resolve, reject) => {
    mutate({ variables })
      .then((data) => {
        const list = data.data.createList

        resolve(list)
      })
      .catch((err) => {
        reject(err)
      })
  })

export const updateListMutation = gql`
  mutation updateList($id: String!, $name: String!) {
    updateList(id: $id, name: $name)
  }
`

export const updateList = (mutate, variables, dispatch) =>
  new Promise((resolve, reject) => {
    mutate({ variables })
      .then((data) => {
        const success = data.data.updateList

        if (success) {
          resolve()
        }

        reject()
      })
      .catch((err) => {
        console.log(err)

        dispatch({
          payload: err,
        })

        reject()
      })
  })

export const deleteListMutation = gql`
  mutation deleteList($id: String!) {
    deleteList(id: $id)
  }
`

export const deleteList = (mutate, variables) =>
  new Promise((resolve, reject) => {
    mutate({ variables })
      .then((data) => {
        const success = data.data.deleteList

        if (success) {
          resolve()
        }

        reject()
      })
      .catch((err) => {
        console.log(err)
        reject()
      })
  })
