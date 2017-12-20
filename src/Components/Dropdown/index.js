import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Dropdown.css'

class Dropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }

    this.handleDropdown = this.handleDropdown.bind(this)
  }

  handleDropdown() {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    const { isOpen } = this.state
    const {
      children, title, wide, superwide,
    } = this.props

    const classes = `DropdownContent ${wide ? 'wide' : ''} ${isOpen ? 'open' : ''} ${
      superwide ? 'superwide' : ''
    }`

    return (
      <div style={{ position: 'relative' }} className="Dropdown">
        <button className="Dropdown" onClick={this.handleDropdown}>
          <a href="#open" onClick={evt => evt.preventDefault()}>
            {title}
          </a>
        </button>
        <div className={classes}>{children}</div>
      </div>
    )
  }
}

Dropdown.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
  title: PropTypes.string.isRequired,
  superwide: PropTypes.bool,
  wide: PropTypes.bool,
}

Dropdown.defaultProps = {
  superwide: false,
  wide: false,
}

export default Dropdown
