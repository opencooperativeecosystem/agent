import gql from 'graphql-tag'

const GetClaim = gql`
query ($token: String, $id: Int) {
  viewer(token: $token) {
    plan(id: $id) {
      name
      id
      plannedOn
      scope {
        id
        name
      }
      planProcesses {
        id
        committedInputs(action: WORK) {
          id
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
                id
                name
              }
              affectedQuantity {
                numericValue
                unit {
                  id
                  name
                }
              }
              affects {
                resourceClassifiedAs {
                  name
                  category
                  id
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
}
`

export default GetClaim
