import gql from 'graphql-tag'

const GetProcessClaim = gql`
query ($token: String, $id: Int) {
  viewer(token: $token) {
    process(id: $id) {
        name
        id
        processPlan {
            id
            name
        }
        scope {
            id
            name
        }
        committedInputs(action: WORK) {
          note
          id
          action
          resourceClassifiedAs{
            name
          }
          committedQuantity {
            unit {
              name
            }
            numericValue
          }
          fulfilledBy(requestDistribution: true) {
            fulfilledBy {
              id
              action
              validations {
                id
                validatedBy {
                  name
                  id
                }
              }
              start
              inputOf {
                name
              }
              affectedQuantity {
                numericValue
                unit {
                  name
                }
              }
              affects {
                resourceClassifiedAs {
                  name
                  category
                }
                trackingIdentifier
              }
              provider {
                id
                name
                image
              }
              receiver {
                id
                name
              }
              note
            }
          }
        }
    }
  }
}
`

export default GetProcessClaim
