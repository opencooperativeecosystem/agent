import gql from 'graphql-tag'

export default gql`
query ($token: String, $id: Int!) {
  viewer(token: $token) {
    agent (id: $id) {
      id
      ownedEconomicResources (category: INVENTORY) {
        id
        url
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
