import gql from 'graphql-tag'

const createProcess = gql`
mutation ($token: String!, $planId: Int! $name: String!, $planned: String!, $plannedFinish: String!, $scope: Int!, $note: String ) {
    createProcess(
        token: $token,
        name: $name,
        plannedStart: $planned,
        plannedFinish: $plannedFinish,
        scopeId: $scope,
        planId: $planId,
        note: $note) {
      process {
        id
        name
        note
        isDeletable
        plannedStart
        plannedFinish
        isFinished
        scope {
          id
          name
        }
        committedOutputs {
          id
        }
        committedInputs {
          id
        }
        inputs {
          id
        }
        workingAgents {
          id
        }
      }
    }
  }`

export default createProcess
