import gql from 'graphql-tag'

const updateCommitment = gql`
mutation ($token: String!, $id: Int!, $note: String, $due: String, $isFinished: Boolean ) {
    updateCommitment(token: $token, note: $note, id: $id, due: $due, isFinished:$isFinished ) {
      commitment {
        id
        note
        isFinished,
        due
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
        inputOf {
          id
        }
      }
    }
  }
`

export default updateCommitment
