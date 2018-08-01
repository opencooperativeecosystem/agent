import gql from 'graphql-tag'

export default gql`
query ($token: String, $id: Int) {
    viewer(token: $token) {
      agent(id: $id) {
        id
        name
        image
        email
        note
        type
        agentRelationships {
          object {
            id
            name
            image
          }
          subject {
            name
            image
            id
          }
        }
        ownedEconomicResources {
          resourceClassifiedAs {
            name
            category
          }
          currentQuantity {
            numericValue
            unit {
              name
            }
          }
        }
      }
    }
  }
`
