import gql from 'graphql-tag'

const Plan = gql`
query ($token: String, $planId: Int) {
    viewer(token: $token) {
      plan(id: $planId) {
        id
        name
        scope {
          id
          name
        }
        planProcesses {
          note
          id
          isFinished
          name
          plannedStart
          scope {
            id
            name
          }
          committedOutputs {
            id
            committedQuantity {
              unit {
                name
              }
              numericValue
            }
            resourceClassifiedAs {
              name
            }
          }
          committedInputs {
            action
            id
            note
            fulfilledBy {
              fulfilledQuantity {
                numericValue
              }
              fulfills {
                action
                fulfilledBy{
                  fulfilledBy {
                    requestDistribution
                  }
                }
              }
            }
            inputOf {
              id
              name
            }
            outputOf {
              id
              name
            }
            due
            isFinished
            involvedAgents {
              image
              id
              name
            }
            committedQuantity {
              unit {
                name
              }
              numericValue
            }
            resourceClassifiedAs {
              category
              name
            }
          }
          workingAgents {
            name
            id
            image
          }
          inputs {
            action
            id
            fulfills {
              fulfilledBy {
                requestDistribution
                provider {
                  name
                  image
                }
                action
                start
                note
                affects {
                  trackingIdentifier
                }
              }
              fulfilledQuantity {
                unit {
                  name
                }
                numericValue
              }
            }
          }
        }
      }
    }
  } 
`
export default Plan
