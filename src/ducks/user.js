import decode from 'jwt-decode'
import { push } from 'react-router-redux'
import { gql } from 'react-apollo'

const CREATE_USER = 'user/terllo/create_user'
const LOGIN = 'user/terllo/login'
const LOGOUT = 'user/terllo/logout'

const initialState = {
  isLoggedIn: false,
  _id: '',
  username: '',
  token: '',
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
    case LOGIN: {
      const { token, _id, username } = action.payload
      return {
        ...state,
        isLoggedIn: true,
        token,
        _id,
        username,
      }
    }

    case LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        _id: '',
        token: '',
        username: '',
      }
    }

    default: {
      return state
    }
  }
}

const setAuthToken = (token) => {
  window.localStorage.setItem('terllo_token', token)
}

export const loginMutation = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`

export const signupMutation = gql`
  mutation signup($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      token
    }
  }
`

export const setUserMutation = gql`
  mutation setUser($token: String!) {
    setUser(token: $token) {
      token
    }
  }
`

export const updateUserMutation = gql`
  mutation updateUser($id: String!, $username: String, $password: String) {
    updateUser(id: $id, username: $username, password: $password) {
      token
    }
  }
`

export const login = (mutate, variables, dispatch) => {
  mutate({ variables }).then((res) => {
    const { data: { login: { token } } } = res
    const { username, _id } = decode(token)

    setAuthToken(token)

    dispatch({
      type: LOGIN,
      payload: {
        username,
        _id,
        token,
      },
    })

    dispatch(push('/boards'))
  })
}

export const signup = (mutate, variables, dispatch) => {
  mutate({ variables })
    .then((data) => {
      const { data: { signup: { token } } } = data
      const { username, _id } = decode(token)

      setAuthToken(token)

      dispatch({
        type: LOGIN,
        payload: {
          username,
          _id,
          token,
        },
      })
      dispatch(push('/boards'))
    })
    .catch(({ response }) => {
      dispatch({
        payload: response.data,
      })
    })
}

export const setUser = (mutate, variables, dispatch) => {
  mutate({ variables }).then((data) => {
    const { data: { setUser: { token } } } = data
    const { username, _id } = decode(token)

    setAuthToken(token)

    dispatch({
      type: LOGIN,
      payload: {
        username,
        _id,
        token,
      },
    })

    dispatch(push('/boards'))
  })
}

export const updateUser = (mutate, variables, dispatch) => {
  mutate({ variables }).then((data) => {
    const { token } = data.data.updateUser

    const { _id, username } = decode(token)

    setAuthToken(token)

    dispatch({
      type: LOGIN,
      payload: {
        username,
        _id,
        token,
      },
    })

    dispatch(push('/settings'))
  })
}

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('terllo_token')
  dispatch({
    type: LOGOUT,
  })
  dispatch(push('/login'))
}
