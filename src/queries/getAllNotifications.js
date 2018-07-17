import gql from 'graphql-tag'

export default gql`
query($token: String) {
    viewer(token: $token) {
      allNotificationTypes {
        id
        label
        display
        description
      }
    }
  }
`
