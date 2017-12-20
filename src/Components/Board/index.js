import React from 'react'
import PropTypes from 'prop-types'

import './Board.css'

const Board = ({
  _id, name, color, onClick, customClass,
}) => {
  const handleOnClick = () => {
    onClick(_id)
  }

  return (
    <button
      className={`Board ${customClass}`}
      style={{ backgroundColor: color }}
      onClick={handleOnClick}
    >
      <h2>{name}</h2>
    </button>
  )
}

Board.propTypes = {
  customClass: PropTypes.string,
  color: PropTypes.string,
  _id: PropTypes.string,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

Board.defaultProps = {
  customClass: '',
  color: '',
  _id: '',
}

export default Board
