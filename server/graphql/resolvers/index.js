import updateUser from './user'
import { signup, login, setUser } from './auth'
import { createBoard, updateBoard, deleteBoard, board, boards } from './board'
import { createList, updateList, deleteList } from './list'
import { createTask, completeTask, deleteTask } from './task'

export default {
  Query: {
    board,
    boards,
  },
  Mutation: {
    signup,
    login,
    setUser,
    createBoard,
    updateBoard,
    deleteBoard,
    createList,
    updateList,
    deleteList,
    createTask,
    completeTask,
    deleteTask,
    updateUser,
  },
}
