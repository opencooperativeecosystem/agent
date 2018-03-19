import gql from 'graphql-tag'

export const UpdateProcess = gql`
mutation ($token: String!, $id: Int!, $isFinished: Boolean ) {
  updateProcess(
    token: $token, 
    id: $id, 
    isFinished: $isFinished
  ) {
    process {
      processPlan {
        id
      }
      id
      name
      isFinished
    }
  }
}`

export default UpdateProcess
