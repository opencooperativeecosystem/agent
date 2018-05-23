import gql from 'graphql-tag'

const GetEventClaim = gql`
query ($token: String, $id: Int!) {
    viewer(token: $token) {
      economicEvent(id: $id) {
        scope {
            id
            name
            }
          fulfills {
            fulfills {
              id
              note
              action
              committedQuantity {
                  numericValue
                  unit {
                      name
                  }
              }
            }
          }
        inputOf {
          name
          id
          processPlan {
            id
            name
          }
        }
        id
        action
        validations {
          id
          validatedBy {
            name
            id
          }
        }
            start
            affectedQuantity {
              numericValue
              unit {
                name
              }
            }
            affects {
              resourceClassifiedAs {
                name
                category
              }
              trackingIdentifier
            }
            provider {
              id
              name
              image
            }
            receiver {
              id
              name
            }
            note
          }
        
    }
  }`

export default GetEventClaim
