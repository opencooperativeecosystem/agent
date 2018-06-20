import gql from 'graphql-tag'

export default gql`
  mutation deleteNotification($id: String!){
      deleteNotification(id: $id) @client {
          message
      }
  }
`