import gql from 'graphql-tag'

const deletePlan = gql`
mutation ($token: String!, $id: Int!) {
    deletePlan(token: $token, id: $id) {
      plan {
        name
      }
    }
  }`

export default deletePlan
