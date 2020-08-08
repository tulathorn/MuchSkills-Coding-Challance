const express = require('express')
// This package automatically parses JSON requests.
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const { ApolloServer, gql } = require('apollo-server-express')

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
client.connect(function (err) {
  console.log('MONGOdb connected')
  db = client.db('Muchskill') //mongodb database name
})

const cors = require('cors')
const app = express()

const typeDefs = gql`
  type section {
    name: String
  }

  type tool {
    name: String
    departments: [section]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    tools: [tool]
  }
`

const resolvers = {
  Query: {
    tools: () => {
      return [
        {
          name: 'Harry Potter and the Chamber of Secrets',
          departments: [{ name: 'dev' }, { name: 'design' }],
        },
        {
          name: 'test',
          departments: [{ name: 'business' }, { name: 'design' }],
        },
      ]
    },
  },
}

const server = new ApolloServer({ typeDefs, resolvers })
server.applyMiddleware({ app })

const PORT = process.env.PORT || 4000
app.use(cors)
app.listen(PORT, () => {
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
})
