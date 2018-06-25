import gql from 'graphql-tag'

const UpdateCommitmentStatus = gql`
mutation ($token: String!, $id: Int!, $isFinished: Boolean ) {
    updateCommitment(
      token: $token, 
      id: $id, 
      isFinished: $isFinished
    ) {
      commitment {
        id
        isFinished
        inputOf {
          id
        }
      }
    }
  }`

export default UpdateCommitmentStatus
