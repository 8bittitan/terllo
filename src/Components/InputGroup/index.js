import React from 'react'
import PropTypes from 'prop-types'

import './InputGroup.css'

const InputGroup = ({ children }) => <div className="InputGroup">{children}</div>

InputGroup.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
}

export default InputGroup
