import gql from 'graphql-tag'

const GetClaims = gql`
query ($token: String, $id: Int) {
    viewer(token: $token) {
      agent(id: $id) {
        id
        eventsCount(month:8, year:2018)
        eventHoursCount(month:8, year:2018)
        eventPeopleCount(month:8, year:2018)
        agentPlans (isFinished: false, month:8, year:2018 ) {
          planProcesses (month:8, year:2018) {
            id
            committedInputs(action: WORK) {
              fulfilledBy(requestDistribution: true) {
                fulfilledBy {
                  id
                  provider {
                    id
                    name
                    image
                  }
                  affectedQuantity {
                    numericValue
                  }
                  validations {
                    id
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  `

export default GetClaims
