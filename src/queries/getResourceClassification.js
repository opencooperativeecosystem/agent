import gql from 'graphql-tag'

export default gql`
query($token: String, $id: Int!) {
    viewer(token: $token) {
      resourceClassification(id:$id) {
        id
        name
        image
        category
        unit {
          id
          name
        }
      }
    }
  }
`
