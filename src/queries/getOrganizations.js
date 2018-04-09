import gql from 'graphql-tag'

const allOrganizations = gql`
query($token: String) {
    viewer(token: $token) {
      fcOrganizations (visibility:"public", joiningStyle:"moderated") {
        id
        name
        image
        note
        type
        __typename
      }
    }
  }`

export default allOrganizations
