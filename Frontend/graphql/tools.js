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
export { TOOLS }
