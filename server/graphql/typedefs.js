export default `
  type TaskResponse {
    success: Boolean!
    task: Task
  }

  type Task {
    _id: String!
    text: String!
    completed: Boolean
  }

  type List {
    name: String!
    _id: String!
    tasks: [Task]
  }

  type Board {
    name: String!
    _id: String!
    color: String
    lists: [List]
  }

  type User {
    token: String!
    boards: [Board]
  }

  type Query {
    user(id: String!): User
    board(id: String!): Board
    boards: [Board]
  }

  type Mutation {
    signup(username: String!, password: String!): User
    login(username: String!, password: String!): User
    setUser(token: String!): User
    createBoard(name: String!): Board
    updateBoard(id: String!, name: String, color: String): Boolean!
    deleteBoard(id: String!): Boolean
    createList(boardId: String!, name: String!): List
    updateList(id: String!, name: String!): Boolean
    deleteList(id: String!): Boolean
    createTask(text: String!, listId: String!): TaskResponse
    completeTask(id: String!, completed: Boolean!): [Task]
    deleteTask(id: String!, listId: String!): Boolean
    updateUser(id: String!, username: String, password: String): User
  }
`
