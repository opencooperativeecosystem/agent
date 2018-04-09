import gql from 'graphql-tag'

const relationshipQuery = gql`
query ($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        agentRelationships {
          relationship {
            label
            category
          }
          object {
            id
            name
            note
            image
          }
          subject {
            name
            image
            id
          }
        }
      }
    }
  }
`

export default relationshipQuery
