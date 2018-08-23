import gql from 'graphql-tag'

const GetClaims = gql`
query ($token: String, $id: Int, $month: Int, $year: Int) {
    viewer(token: $token) {
      agent(id: $id) {
        id
        eventsCount(month:$month, year:$year)
        eventHoursCount(month:$month, year:$year)
        eventPeopleCount(month:$month, year:$year)
        agentPlans (isFinished: false, month:$month, year:$year ) {
          planProcesses (month:$month, year:$year) {
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
                    validatedBy {
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
  }
  `

export default GetClaims
