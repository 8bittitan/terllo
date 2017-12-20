import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Input.css'

class Input extends Component {
  render() {
    const {
      type, placeholder, name, onBlur, onChange, onKeydown, reference, value,
    } = this.props
    return (
      <input
        className={`Input ${type}`}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeydown}
        ref={reference}
        defaultValue={value}
        onBlur={onBlur}
      />
    )
  }
}

Input.propTypes = {
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeydown: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  reference: PropTypes.func,
  value: PropTypes.string,
}

Input.defaultProps = {
  name: '',
  onBlur: () => {},
  onChange: () => {},
  onKeydown: () => {},
  placeholder: '',
  reference: () => {},
  value: '',
}

export default Input
