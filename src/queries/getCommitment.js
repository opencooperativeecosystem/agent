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
          id
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
            id
          }
          numericValue
        }
        resourceClassifiedAs {
          category
          name
          id
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
