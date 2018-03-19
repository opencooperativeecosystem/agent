import gql from 'graphql-tag'

const UpdateCommitmentTitle = gql`
mutation ($token: String!, $id: Int!, $note: String, $due: String, $isFinished: Boolean ) {
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

export default UpdateCommitmentTitle
