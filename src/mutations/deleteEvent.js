import gql from 'graphql-tag'

export default gql`
mutation ($token: String!, $id: Int!) {
    deleteEconomicEvent(
      token: $token,
      id: $id
    ) {
      economicEvent {
        action
        start
      }
    }
}
`