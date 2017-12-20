import React from 'react'
import PropTypes from 'prop-types'

import './Task.css'

const Task = ({
  _id, text, completed, handleChange,
}) => {
  const handleComplete = () => {
    handleChange(_id, completed)
  }

  return (
    <div className="Task">
      <label htmlFor={_id} className={`${completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          name={_id}
          id={_id}
          onChange={handleComplete}
          checked={`${completed ? 'checked' : ''}`}
        />
        {text}
      </label>
    </div>
  )
}

Task.propTypes = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default Task
