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
          plannedFinish
          scope {
            id
            name
          }
          committedOutputs {
            id
            action
            note
            due
            scope {
              id
            }
            involvedAgents {
              image
              id
              name
            }
            inputOf {
              id
              name
            }
            outputOf {
              id
              name
            }
            committedQuantity {
              unit {
                name
                id
              }
              numericValue
            }
            resourceClassifiedAs {
              name
              id
            }
          }
          committedInputs {
            action
            id
            note
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
                id
                name
              }
              numericValue
            }
            resourceClassifiedAs {
              category
              name
              id
            }
          }
        }
      }
    }
  } 
`
export default Plan
