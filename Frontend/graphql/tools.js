import { gql } from '@apollo/client'

const TOOLS = gql`
  query {
    newTools {
      _id
      name
      isDev
      isDesign
      isBusiness
      isOperation
    }
  }
`

const TOOL = gql`
  query Tool($id: String) {
    tool(_id: $id) {
      _id
      name
      isDev
      isDesign
      isBusiness
      isOperation
    }
  }
`

const ADD_TOOL = gql`
  mutation AddNewTool(
    $name: String
    $isDev: Boolean
    $isDesign: Boolean
    $isBusiness: Boolean
    $isOperation: Boolean
  ) {
    addNewTool(
      name: $name
      isDev: $isDev
      isDesign: $isDesign
      isBusiness: $isBusiness
      isOperation: $isOperation
    ) {
      _id
      name
      isDev
      isDesign
      isBusiness
      isOperation
    }
  }
`

export { TOOLS, TOOL, ADD_TOOL }
