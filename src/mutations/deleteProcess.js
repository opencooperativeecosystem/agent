import gql from 'graphql-tag'

const deleteProcess = gql`
mutation ($token: String!, $id: Int!) {
    deleteProcess(token: $token, id: $id) {
      process {
        name
      }
    }
  }`

export default deleteProcess
