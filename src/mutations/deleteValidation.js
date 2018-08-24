import gql from 'graphql-tag'

const deleteValidation = gql`
mutation ($token: String!, $id: Int!) {
    deleteValidation(token: $token, id: $id) {
      validation {
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
          action
          affectedQuantity {
            numericValue
            unit {
              id
              name
            }
          }
        }
        validationDate
      }
    }
  }`

export default deleteValidation
