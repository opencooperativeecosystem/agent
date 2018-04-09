import gql from 'graphql-tag'

const GetCommitment = gql`
query ($token: String) {
  viewer(token: $token) {
    myAgent {
      ownedEconomicResources {
        id
        resourceClassifiedAs {
        name
        category
        }
        trackingIdentifier
        currentQuantity {
        numericValue
        unit {
            name
        }
        }
        image
        note
      }
    }
  }
}
`

export default GetCommitment
  