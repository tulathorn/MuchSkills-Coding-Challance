import { gql } from '@apollo/client'

const TOOLS = gql`
  query {
    tools {
      _id
      name
      departments {
        name
      }
    }
  }
`

const ADD_TOOL = gql`
mutation
  createNewTools($input: addTool){
    name: String
    departments($input: addSection): [
      {
        name: String
      }
    ]
  }
`

export { TOOLS, ADD_TOOL }
