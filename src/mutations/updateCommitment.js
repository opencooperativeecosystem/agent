import gql from 'graphql-tag'

const updateCommitment = gql`
mutation ($token: String!, $id: Int!, $note: String, $due: String, $isFinished: Bool ) {
    updateCommitment(token: $token, note: $note, id: $id, due: $due, isFinished:$isFinished ) {
      commitment {
        id
        note
        isFinished,
        due
      }
    }
  }
`

export default updateCommitment
