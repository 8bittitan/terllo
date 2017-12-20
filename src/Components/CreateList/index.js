import React from 'react'
import PropTypes from 'prop-types'

import Input from '../Input'
import InputGroup from '../InputGroup'

const CreateList = ({ submitHandler, reference }) => (
  <div>
    <InputGroup>
      <h1>New List</h1>
    </InputGroup>
    <form onSubmit={submitHandler}>
      <InputGroup>
        <Input type="text" placeholder="List name" reference={reference} />
      </InputGroup>

      <button className="Button">Create list</button>
    </form>
  </div>
)

CreateList.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  reference: PropTypes.func.isRequired,
}

export default CreateList
