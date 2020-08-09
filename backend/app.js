const express = require('express')
// This package automatically parses JSON requests.
const bodyParser = require('body-parser')
// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const { ApolloServer, gql } = require('apollo-server-express')
const mongoose = require('mongoose')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useFindAndModify: false })

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

  input addNewTool {
    name: String
    isDev: Boolean
    isDesign: Boolean
    isBusiness: Boolean
    isOperation: Boolean
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

  type newTool {
    _id: ID
    name: String
    isDev: Boolean
    isDesign: Boolean
    isBusiness: Boolean
    isOperation: Boolean
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    tools: [tool]
    newTools: [newTool]
  }
  type Mutation {
    createNewTools(input: addTool): [tool]
    addNewTool(
      name: String
      isDev: Boolean
      isDesign: Boolean
      isBusiness: Boolean
      isOperation: Boolean
    ): [tool]
    updateTools(_id: ID, input: addTool): tool
    deleteTools(_id: ID): [tool]
  }
`

const resolvers = {
  Query: {
    tools: async () => {
      const data = await ToolsModel.find().then((data) => data)
      console.log(data)
      return data
    },
    newTools: async () => {
      const data = await ToolsModel.find().then((data) => data)
      return data
    },
  },
  Mutation: {
    createNewTools: async (_, data) => {
      data = data.input
      temp = JSON.stringify(data)
      temp2 = JSON.parse(temp)
      const result = await ToolsModel.create(temp2).then((data) => data)
      mockdata = { ...mockdata, temp2 }
      return [result]
    },
    addNewTool: async (parent, args) => {
      console.log('root', parent)
      console.log('data', args)
      const result = await ToolsModel.create(args).then((data) => data)
      return [result]
    },
    updateTools: async (_, data) => {
      const id = data._id
      temp2 = JSON.parse(JSON.stringify(data.input))
      const result = await ToolsModel.findOneAndUpdate({ _id: id }, { ...temp2 }).then(
        (data) => data
      )
      return {
        _id: id,
        ...temp2,
      }
    },
    deleteTools: async (_, data) => {
      const id = data._id
      const result = await ToolsModel.deleteOne({ _id: id }).then((data) => data)
      return await ToolsModel.find().then((data) => data)
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
