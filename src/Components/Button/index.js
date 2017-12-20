import React from 'react'
import PropTypes from 'prop-types'

import './Buttons.css'

const Button = ({
  text, onClick, customClass, type,
}) => (
  <button className={`Button ${customClass}`} onClick={onClick} type={type}>
    {text}
  </button>
)

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  customClass: PropTypes.string,
  type: PropTypes.string,
}

Button.defaultProps = {
  onClick: () => {},
  customClass: '',
  type: 'submit',
}

export default Button
