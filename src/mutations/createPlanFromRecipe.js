import gql from "graphql-tag";

const createPlanFromRecipe = gql`
  mutation(
    $token: String!
    $id: Int!
    $note: String
    $name: String!
    $due: String!
  ) {
    createPlanFromRecipe(
      token: $token
      name: $name
      due: $due
      note: $note
      producesResourceClassificationId: $id
    ) {
      plan {
        id
        name
        due
        note
        planProcesses {
          name
        }
      }
    }
  }
`;

export default createPlanFromRecipe;
