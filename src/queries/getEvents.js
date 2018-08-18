import gql from 'graphql-tag'

export default gql`
query ($token: String!, $id: Int!) {
    viewer(token: $token) {
        commitment(id: $id) {
          id
          fulfilledBy {
            fulfilledBy {
              action
              requestDistribution
              start
              id
              note
              provider {
                name
                image
                id
              }
              scope {
                id
              }
              affects {
                trackingIdentifier
                resourceClassifiedAs {
                  name
                  id
                }
                note
              }
              url
            }
            fulfilledQuantity {
              numericValue
              unit {
                id
                name
              }
            }
          }
        }
    }
}
`