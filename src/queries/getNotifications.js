import gql from 'graphql-tag'

export default gql`
  query {
    notifications @client {
        id
        message
        type
    }
  }
`
  