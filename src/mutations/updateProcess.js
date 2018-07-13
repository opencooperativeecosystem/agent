import gql from "graphql-tag";

export const UpdateProcess = gql`
  mutation(
    $token: String!
    $id: Int!
    $isFinished: Boolean
    $name: String
    $scopeId: Int
    $note: String
    $start: String
  ) {
    updateProcess(
      token: $token
      id: $id
      isFinished: $isFinished
      name: $name
      scopeId: $scopeId
      note: $note
      plannedStart: $start
    ) {
      process {
        processPlan {
          id
        }
        id
        name
        scope{
          id
          name
        }
        note
        isDeletable
        plannedStart
        isFinished
      }
    }
  }
`;

export default UpdateProcess;
