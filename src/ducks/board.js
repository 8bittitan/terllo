import { gql } from 'react-apollo'
import { push } from 'react-router-redux'

export const boardsQuery = gql`
  query {
    boards {
      _id
      name
      color
    }
  }
`

export const boardQuery = gql`
  query board($id: String!) {
    board(id: $id) {
      _id
      name
      color
      lists {
        _id
        name
        tasks {
          _id
          text
          completed
        }
      }
    }
  }
`

export const createBoardMutation = gql`
  mutation createBoard($name: String!) {
    createBoard(name: $name) {
      _id
      name
    }
  }
`

export const updateBoardMutation = gql`
  mutation updateBoard($id: String!, $name: String, $color: String) {
    updateBoard(id: $id, name: $name, color: $color)
  }
`

export const deleteBoardMutation = gql`
  mutation deleteBoard($id: String!) {
    deleteBoard(id: $id)
  }
`

export const createBoard = (mutate, variables, dispatch) => {
  mutate({ variables })
    .then((data) => {
      const board = data.data.createBoard

      dispatch(push(`/board/${board._id}`))
    })
    .catch((err) => {
      dispatch({
        payload: err,
      })
    })
}

export const updateBoard = (mutate, variables, dispatch) =>
  new Promise((resolve, reject) => {
    mutate({ variables })
      .then((data) => {
        const success = data.data.updateBoard

        if (!success) {
          dispatch({
            payload: {
              message: 'Something went wrong',
              status: 500,
            },
          })
          reject()
        }

        resolve()
      })
      .catch((err) => {
        console.log(err)
        reject()
      })
  })

export const deleteBoard = (mutate, variables, dispatch) => {
  mutate({ variables })
    .then((data) => {
      const success = data.data.deleteBoard

      if (success) {
        dispatch(push('/boards'))
      }
    })
    .catch((err) => {
      dispatch({
        payload: err,
      })
    })
}
