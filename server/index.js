import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import jwt from 'jsonwebtoken'
import cors from 'cors'

import config from './config'
import { connect, models } from './db'

import schema from './graphql'

const app = express()
const rootUrl = path.join(__dirname, '..')

app.use(cors('*'))

const authUser = (req, res, next) => {
  const token = req.headers['x-access-token']

  if (token) {
    try {
      const data = jwt.verify(token, config.JWT_SECRET)
      req.user = data._id
    } catch (err) {
      throw new Error(err.message)
    }
  }

  next()
}

connect(config.MONGO_URL)

app.use(express.static(path.join(rootUrl, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(authUser)

app.use(
  '/graphiql',
  bodyParser.json(),
  graphiqlExpress({
    endpointURL: '/graphql',
  }),
)

app.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user,
      jwt,
      config,
      models,
    },
  })),
)

app.get('/*', (req, res) => res.sendFile(path.join(rootUrl, 'public/index.html')))

app.listen(8080, () => {
  console.log('Listening on port: 8080')
})
