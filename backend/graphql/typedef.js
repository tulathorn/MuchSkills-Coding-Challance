// const { makeExecutableSchema } = require('graphql-tools')
const { gql } = require('apollo-server-express')

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

// Generate the schema object from your types definition.
module.exports = typeDefs
