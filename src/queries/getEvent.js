import gql from 'graphql-tag'

export default gql`
query ($token: String, $id: Int!) {
    viewer(token: $token) {
      economicEvent(id: $id) {
        id
        action
        start
      inputOf {
        name
        id
        processPlan {
          name
          id
        }
      }
        affectedQuantity {
          numericValue
          unit {
            id
            name
          }
        }
        note
        affects {
          resourceClassifiedAs {
            name
            id
          }
        }
        provider {
          id
          image
          name
        }
        validations {
            id
            note
          validatedBy {
            name
            id
          }
        }
        scope {
          id
          name
        }
      }
    }
  }`