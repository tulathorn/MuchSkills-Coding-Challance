const express = require('express')
// This package automatically parses JSON requests.
const bodyParser = require('body-parser')
// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const { ApolloServer, gql } = require('apollo-server-express')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('database connected')
})

const ToolsModel = require('./model/tools')

let mockdata = [
  {
    name: 'Harry Potter and the Chamber of Secrets',
    departments: [{ name: 'dev' }, { name: 'design' }],
  },
  {
    name: 'test',
    departments: [{ name: 'business' }, { name: 'design' }],
  },
]

const cors = require('cors')
const Tools = require('./model/tools')
const app = express()

const typeDefs = gql`
  input addTool {
    name: String
    departments: [addSection]
  }

  input addSection {
    name: String
  }

  type section {
    name: String
  }

  type tool {
    _id: ID
    name: String
    departments: [section]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    tools: [tool]
  }
  type Mutation {
    createNewTools(input: addTool): [tool]
    updateTools(_id: ID, input: addTool): [tool]
  }
`

const resolvers = {
  Query: {
    tools: async () => {
      const data = await ToolsModel.find().then((data) => data)
      console.log(data)
      return data
    },
  },
  Mutation: {
    createNewTools: async (_, data) => {
      data = data.input
      temp = JSON.stringify(data)
      temp2 = JSON.parse(temp)
      const result = await ToolsModel.create(temp2).then((data) => data)
      console.log(JSON.parse(temp), mockdata)
      mockdata = { ...mockdata, temp2 }
      return [result]
    },
    updateTools: async (id, data) => {
      console.log('id', data._id)
      console.log('data', data.input)
      temp2 = JSON.parse(JSON.stringify(data.input))
      const result = await ToolsModel.findOneAndUpdate({ _id: data._id }, { ...temp2 }).then(
        (data) => data
      )
      console.log('result', result)
      console.log(temp2)
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
