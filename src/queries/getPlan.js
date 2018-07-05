import gql from 'graphql-tag'

const Plan = gql`
query ($token: String, $planId: Int) {
    viewer(token: $token) {
      plan(id: $planId) {
        id
        name
        note
        due
        plannedOn
        isDeletable
        scope {
          id
          name
        }
        planProcesses {
          note
          id
          isFinished
          name
          isDeletable
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
                unit {
                  name
                }
              }
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
