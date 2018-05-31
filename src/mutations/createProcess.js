import gql from 'graphql-tag'

const createProcess = gql`
mutation ($token: String!, $planId: Int! $name: String!, $planned: String!, $duration: Int!, $scope: Int!, $note: String ) {
    createProcess(
        token: $token,
        name: $name,
        plannedStart: $planned,
        plannedDuration: $duration,
        scopeId: $scope,
        planId: $planId,
        note: $note) {
      process {
        id
        name
        note
        plannedStart
      }
    }
  }`

export default createProcess
