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

const cors = require('cors')
const app = express()

const typeDefs = gql`
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
    newTools: [newTool]
    tool(_id: String): newTool
  }
  type Mutation {
    addNewTool(
      name: String
      isDev: Boolean
      isDesign: Boolean
      isBusiness: Boolean
      isOperation: Boolean
    ): [newTool]
    updateNewTool(
      _id: String
      name: String
      isDev: Boolean
      isDesign: Boolean
      isBusiness: Boolean
      isOperation: Boolean
    ): newTool
    deleteNewTool(_id: String): [newTool]
  }
`

const resolvers = {
  Query: {
    newTools: async () => {
      const data = await ToolsModel.find().then((data) => data)
      return data
    },
    tool: async (parent, args) => {
      console.log(args)
      const data = await ToolsModel.findOne({ _id: args._id }).then((data) => data)
      return data
    },
  },
  Mutation: {
    addNewTool: async (parent, args) => {
      console.log('root', parent)
      console.log('data', args)
      const result = await ToolsModel.create(args).then((data) => data)
      return [result]
    },
    updateNewTool: async (parent, args) => {
      console.log('update call')
      console.log('parent', parent)
      console.log('data', args)
      const result = await ToolsModel.findOneAndUpdate({ _id: args._id }, { ...args }).then(
        (data) => data
      )
      console.log('result', result)
      return result
    },
    deleteNewTool: async (parent, args) => {
      const id = args._id
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
