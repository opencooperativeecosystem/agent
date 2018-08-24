import gql from "graphql-tag";

const createValidation = gql`
  mutation(
    $token: String!
    $validatedById: Int!
    $economicEventId: Int!
    $note: String
  ) {
    createValidation(
      token: $token
      validatedById: $validatedById
      economicEventId: $economicEventId
      note: $note
    ) {
      validation {
        id
        note
        validatedBy {
          name
          id
        }
        economicEvent {
          id
          scope {
            id
          }
          inputOf {
            id
            processPlan {
              id
            }
          }
        }
        validationDate
      }
    }
  }
`;

export default createValidation;
