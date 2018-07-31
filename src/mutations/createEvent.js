import gql from "graphql-tag";

export default gql`
  mutation(
    $token: String!
    $providerId: Int
    $receiverId: Int
    $action: String!
    $requestDistribution: Boolean
    $start: String
    $scopeId: Int!
    $commitmentId: Int!
    $note: String
    $affectedNumericValue: String!
    $affectedUnitId: Int!
    $affectedResourceClassifiedAsId: Int
    $resourceCurrentLocationId: Int
    $resourceTrackingIdentifier: String
    $createResource: Boolean
  ) {
    createEconomicEvent(
      token: $token
      action: $action
      start: $start
      providerId: $providerId
      receiverId: $receiverId
      scopeId: $scopeId
      requestDistribution: $requestDistribution
      fulfillsCommitmentId: $commitmentId
      note: $note
      affectedNumericValue: $affectedNumericValue
      affectedUnitId: $affectedUnitId
      affectedResourceClassifiedAsId: $affectedResourceClassifiedAsId
      resourceCurrentLocationId: $resourceCurrentLocationId
      resourceTrackingIdentifier: $resourceTrackingIdentifier
      createResource: $createResource
    ) {
      economicEvent {
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
        scope {
          id
        }
        affectedQuantity {
          numericValue
          unit {
            id
            name
          }
        }
      }
    }
  }
`;
