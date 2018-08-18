import gql from "graphql-tag";

const createCommitment = gql`
  mutation(
    $token: String!
    $inputOfId: Int
    $outputOfId: Int
    $committedUnitId: Int!
    $due: String!
    $action: String!
    $planId: Int
    $note: String
    $committedNumericValue: String!
    $committedResourceClassifiedAsId: Int!
    $providerId: Int
    $scopeId: Int
  ) {
    createCommitment(
      token: $token
      inputOfId: $inputOfId
      outputOfId: $outputOfId
      committedUnitId: $committedUnitId
      due: $due
      action: $action
      note: $note
      committedResourceClassifiedAsId: $committedResourceClassifiedAsId
      planId: $planId
      scopeId: $scopeId
      committedNumericValue: $committedNumericValue
      providerId: $providerId
    ) {
      commitment {
        action
        id
        note
        scope {
          id
        }
        fulfilledBy {
          fulfilledQuantity {
            numericValue
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
`;

export default createCommitment;
