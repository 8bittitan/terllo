export const createBoard = async (parent, { name }, { user, models: { Board } }) => {
  try {
    const board = new Board({ name, userId: user })
    const data = await board.save()
    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

export const boards = async (parent, args, { models: { Board }, user }) => {
  try {
    return Board.find({ userId: user })
      .populate('lists')
      .exec()
  } catch (err) {
    throw new Error(err.message)
  }
}

export const board = async (parent, { id }, { user, models: { Board } }) => {
  try {
    const data = await Board.findOne({ _id: id, userId: user })
      .populate({
        path: 'lists',
        populate: {
          path: 'tasks',
          model: 'Task',
        },
      })
      .exec()

    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateBoard = async (parent, { id, name, color }, { user, models: { Board } }) => {
  try {
    const options = {}

    if (color && color !== '') {
      options.color = color
    }

    if (name && name !== '') {
      options.name = name
    }

    await Board.findOneAndUpdate({ _id: id, userId: user }, { $set: options })

    return true
  } catch (err) {
    return false
  }
}

export const deleteBoard = async (parent, { id }, { user, models: { Board, List } }) => {
  try {
    await List.remove({ boardId: id })
    await Board.findOneAndRemove({ _id: id, userId: user })
    return true
  } catch (err) {
    return false
  }
}
