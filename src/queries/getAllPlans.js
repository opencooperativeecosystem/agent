import gql from 'graphql-tag'

export default gql`
query ($token: String, $id: Int) {
    viewer(token: $token) {
      agent(id: $id) {
        id
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
