import gql from 'graphql-tag'

export default gql`
  mutation updateNotification($id: String!, $message: String!, $type: String){
      updateNotification(id: $id, message: $message, type: $type) @client {
          id,
          type,
          message
      }
  }
`