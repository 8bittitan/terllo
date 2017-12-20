import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { logout } from '../../ducks/user'

import Dropdown from '../../Components/Dropdown'

import './Header.css'

const Header = ({ dispatch, userId, username }) => {
  const handleLogout = (evt) => {
    evt.preventDefault()
    dispatch(logout())
  }

  return (
    <header>
      <a className="logo" href="/">
        Terllo
      </a>

      {userId !== '' && (
        <div className="actions">
          <Link to="/boards" href="/boards">
            Boards
          </Link>
          <Dropdown title={`${username[0].toUpperCase()}${username.substring(1)}`} wide>
            <ul
              style={{
                listStyleType: 'none',
              }}
            >
              <li
                style={{
                  marginBottom: '0.5em',
                }}
              >
                <Link to="/settings" href="/settings">
                  Settings
                </Link>
              </li>
              <li
                style={{
                  marginBottom: '0.5em',
                }}
              >
                <a href="#logout" onClick={handleLogout}>
                  Logout
                </a>
              </li>
            </ul>
          </Dropdown>
        </div>
      )}
    </header>
  )
}

Header.propTypes = {
  dispatch: PropTypes.func,
  userId: PropTypes.string,
  username: PropTypes.string,
}

Header.defaultProps = {
  dispatch: () => {},
  userId: '',
  username: '',
}

const mapStateToProps = state => ({
  userId: state.user._id,
  username: state.user.username,
})

export default connect(mapStateToProps)(Header)
