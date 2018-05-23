import gql from 'graphql-tag'

const agentQuery = gql`
query ($token: String, $id: Int) {
    viewer(token: $token) {
      agent(id: $id) {
        agentPlans {
          name
          id
          note
          due
          plannedOn
          planProcesses {
            isStarted
            isFinished
            name
          }
        }
      }
    }
  }
`

export default agentQuery
