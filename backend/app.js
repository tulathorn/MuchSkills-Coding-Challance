const express = require('express')
// This package automatically parses JSON requests.
const bodyParser = require('body-parser')

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const { ApolloServer, gql } = require('apollo-server-express')

// schema for GraphQL
const schema = require('./graphql/index')

const cors = require('cors')
const app = express()

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`

const resolvers = {
  Query: {
    books: () => {
      return [
        {
          title: 'Harry Potter and the Chamber of Secrets',
          author: 'J.K. Rowling',
        },
        {
          title: 'Jurassic Park',
          author: 'Michael Crichton',
        },
      ]
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

// Inti startup server
// app.use(cors())
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
// app.use(
//   '/graphiql',
//   graphiqlExpress({
//     endpointURL: '/graphql',
//   })
// )

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})
