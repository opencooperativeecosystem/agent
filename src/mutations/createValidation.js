import gql from 'graphql-tag'

const createValidation = gql`
mutation ($token: String!, $validatedById: Int!, $economicEventId: Int!) {
  createValidation(token: $token,
    validatedById: $validatedById,
    economicEventId: $economicEventId
  ) {
    validation {
      id
      validatedBy {
        name
        id
      }
      economicEvent {
        id
        inputOf {
          id
          processPlan {
            id
          }
        }
      }
      validationDate
    }
  }
}`

export default createValidation
  