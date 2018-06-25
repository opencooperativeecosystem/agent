import gql from 'graphql-tag'

export default gql`
mutation ($token: String!, $id: Int!) {
    deleteCommitment(token: $token, id: $id) {
      commitment {
        action
        fulfilledBy {
          fulfilledBy {
            action
            start
            id
            requestDistribution
            note
            provider {
              id
              name
              image
            }
          }
        }
      }
    }
}`