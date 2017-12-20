import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import config from '../config'

import createUserModel from './models/user'
import createBoardModel from './models/board'
import createListModel from './models/list'
import createTaskModel from './models/task'

export const connect = (url) => {
  mongoose.Promise = global.Promise

  mongoose
    .connect(url, { useMongoClient: true })
    .then(() => {
      console.log('DB connected!')
    })
    .catch((err) => {
      console.log(err)
    })
}

const { JWT_SECRET } = config

const User = createUserModel({
  mongoose,
  bcrypt,
  jwt,
  JWT_SECRET,
})()
const Board = createBoardModel({ mongoose })()
const List = createListModel({ mongoose })()
const Task = createTaskModel({ mongoose })()

export const models = {
  User,
  Board,
  List,
  Task,
}
