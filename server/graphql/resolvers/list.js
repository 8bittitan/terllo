export const createList = async (parent, { name, boardId }, { user, models: { Board, List } }) => {
  try {
    const list = new List({ name, board: boardId })
    const data = await list.save()

    await Board.findOneAndUpdate({ _id: boardId, userId: user }, { $push: { lists: data._id } })

    return data
  } catch (err) {
    throw new Error(err.message)
  }
}

export const updateList = async (parent, { id, name }, { models: { List } }) => {
  try {
    await List.findOneAndUpdate({ _id: id }, { $set: { name } }, { new: true })

    return true
  } catch (err) {
    return false
  }
}

export const deleteList = async (parent, { id }, { models: { List, Task } }) => {
  try {
    await List.findByIdAndRemove(id)

    await Task.remove({ listId: id })

    return true
  } catch (err) {
    return false
  }
}
