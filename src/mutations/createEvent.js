import gql from 'graphql-tag';

export default gql`
mutation ($token: String!, $providerId: Int, $action: String!, $requestDistribution: Boolean, $start: String, $scopeId: Int!, $commitmentId: Int!, $note: String, $affectedNumericValue: String!, $affectedUnitId: Int!  ) {
  createEconomicEvent(
    token: $token,
    action: $action,
    start: $start,
    providerId: $providerId,
    scopeId: $scopeId, 
    requestDistribution: $requestDistribution, 
    fulfillsCommitmentId: $commitmentId,
    note: $note,
    affectedNumericValue: $affectedNumericValue, 
    affectedUnitId: $affectedUnitId, 
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
          name
        }
      }
    }
  }
}
`