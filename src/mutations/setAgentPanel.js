import gql from 'graphql-tag'

export default gql`
  mutation setAgentPanel($type: String!){
      setAgentPanel(type: $type) @client
  }
`