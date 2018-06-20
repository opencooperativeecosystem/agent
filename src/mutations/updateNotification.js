import gql from 'graphql-tag'

export default gql`
  mutation addNotification($message: String!, $type: String){
      addNotification(message: $message, type: $type) @client {
          id,
          type,
          message
      }
  }
`