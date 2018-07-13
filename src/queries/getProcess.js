import gql from "graphql-tag";

const getProcess = gql`
  query($token: String, $id: String) {
    viewer(token: $token) {
      process(id: $id) {
        id
        name
        scope {
          name
        }
        processPlan {
          name
          due
        }
        plannedStart
        plannedDuration
        isFinished
        note
        userIsAuthorizedToUpdate
        userIsAuthorizedToDelete
        workingAgents {
          id
          name
          image
        }
        committedInputs {
          note
          id
          action
          resourceClassifiedAs {
            name
          }
          committedQuantity {
            unit {
              id
              name
            }
            numericValue
          }
        }
      }
    }
  }
`;

export default getProcess;
