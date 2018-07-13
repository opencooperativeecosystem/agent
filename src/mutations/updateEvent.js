import gql from 'graphql-tag'

export default gql`
mutation ($token: String!, $id: Int!, $start: String!, $requestDistribution: Boolean, $scopeId: Int!, $note: String, $affectedNumericValue: String!, $affectedUnitId: Int! ) {
  updateEconomicEvent(
    token: $token,
    id: $id,
    start: $start,
    scopeId: $scopeId, 
    requestDistribution: $requestDistribution, 
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
            id
            name
          }
          numericValue
        }
      }
  }
}`