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
        name
        id
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
                id
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
}
`

export default GetClaim
