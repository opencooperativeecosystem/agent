import gql from 'graphql-tag'

const agentPlans = gql`
  query($token: String) {
    viewer(token: $token) {
      myAgent {
        id
        agentPlans {
            id
        }
      }
    }
  }
`;

export default agentPlans