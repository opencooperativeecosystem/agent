import gql from 'graphql-tag';

export default gql`
mutation ($token: String!, $action: String!, $requestDistribution: Boolean, $start: String, $scopeId: Int!, $commitmentId: Int!, $note: String, $affectedNumericValue: String!, $affectedUnitId: Int!  ) {
  createEconomicEvent(
    token: $token,
    action: $action,
    start: $start,
    scopeId: $scopeId, 
    requestDistribution: $requestDistribution, 
    fulfillsCommitmentId: $commitmentId,
    note: $note,
    affectedNumericValue: $affectedNumericValue, 
    affectedUnitId: $affectedUnitId, 
    ) {
    economicEvent {
      action
      note
      start
      id
      requestDistribution
      scope {
        id
      }
      provider {
        name
        id
        image
      }
      affectedQuantity {
        unit {
          name
        }
        numericValue
      }
    }
  }
}
`