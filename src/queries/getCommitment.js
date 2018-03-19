import gql from 'graphql-tag'

const GetCommitment = gql`
query ($token: String, $id: Int!) {
    viewer(token: $token) {
      commitment(id: $id) {
        action
        id
        note
        scope {
          id
        }
        provider {
          id
          name
          image
        }
        inputOf {
          name
        }
        due
        isFinished
        involvedAgents {
          image
          id
          name
        }
        committedQuantity {
          unit {
            name
          }
          numericValue
        }
        resourceClassifiedAs {
          category
          name
        }
      }
    }
    viewer(token: $token) {
      allUnits {
        id
        name
        symbol
      }
    }
  }`

export default GetCommitment
