export const createTask = async (parent, { text, listId }, { models: { List, Task } }) => {
  try {
    const list = await List.findById(listId)

    if (list) {
      const task = new Task({ text, listId })
      const data = await task.save()

      await list.update({
        $push: { tasks: data._id },
      })

      return {
        success: true,
        task: data,
      }
    }

    return {
      success: false,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const completeTask = async (parent, { id, completed }, { models: { Task } }) => {
  try {
    const task = await Task.findByIdAndUpdate(id, { $set: { completed } }, { new: true })
    const tasks = await Task.find({ listId: task.listId })

    return tasks
  } catch (err) {
    throw new Error(err.message)
  }
}

export const deleteTask = async (parent, { listId, id }, { models: { List, Task } }) => {
  try {
    await Task.findByIdAndRemove(id)
    await List.findByIdAndUpdate(listId, { $pull: { tasks: id } })

    return true
  } catch (err) {
    return false
  }
}
