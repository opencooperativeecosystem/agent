import gql from "graphql-tag";

export default gql`
  query($token: String, $id: Int) {
    viewer(token: $token) {
      agent(id: $id) {
        id
        image
        name
        email
        note
        agentSkills {
          id
          name
        }
        agentEconomicEvents(latestNumberOfDays: 30) {
          note
          action
          provider {
            image
            name
            id
          }
          inputOf {
            name
          }
          receiver {
            name
          }
          start
          requestDistribution
          note
          affectedQuantity {
            numericValue
            unit {
              name
            }
          }
        }
      }
    }
  }
`;
