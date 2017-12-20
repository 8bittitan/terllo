import { ApolloClient, createNetworkInterface } from 'react-apollo'

const networkInterface = createNetworkInterface({
  uri: '/graphql',
})

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }

      const token = window.localStorage && window.localStorage.getItem('terllo_token')

      if (token) {
        req.options.headers['x-access-token'] = token
      }

      next()
    },
  },
])

const client = new ApolloClient({
  networkInterface,
})

export default client
