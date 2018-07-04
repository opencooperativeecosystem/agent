import gql from "graphql-tag";

export const UpdateProcess = gql`
  mutation($token: String!, $id: Int!, $isFinished: Boolean, $name: String, $note: String, $start: String) {
    updateProcess(token: $token, id: $id, isFinished: $isFinished, name: $name note: $note, plannedStart: $start) {
      process {
        processPlan {
          id
        }
        id
        name
        note
        isDeletable
        plannedStart
        isFinished
      }
    }
  }
`;

export default UpdateProcess;
