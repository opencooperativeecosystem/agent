import gql from 'graphql-tag'

const GetClaims = gql`
query ($token: String, $id: Int) {
    viewer(token: $token) {
      agent(id: $id) {
        id
        agentPlans (isFinished: false) {
          name
          id
          plannedOn
          planProcesses {
            id
            committedInputs(action: WORK) {
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
    }
  }
  `

export default GetClaims
