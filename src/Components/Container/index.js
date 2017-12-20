import React from 'react'
import PropTypes from 'prop-types'

import './Container.css'

const Container = ({ children }) => <div className="Container">{children}</div>

Container.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.element), PropTypes.element])
    .isRequired,
}

export default Container
