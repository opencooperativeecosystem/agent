import {compose, withHandlers, withState} from 'recompose'
import Component from './logEvent'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import moment from 'moment'
import {connect} from 'react-redux'
import { actions as notifActions } from 'redux-notifications'

const plan = gql`
query ($token: String, $planId: Int) {
    viewer(token: $token) {
      plan(id: $planId) {
        id
        name
        scope {
          id
          name
        }
        planProcesses {
          note
          id
          name
          plannedDuration
          plannedStart
          committedOutputs {
            id
            committedQuantity {
              unit {
                name
              }
              numericValue
            }
            resourceClassifiedAs {
              name
            }
          }
          committedInputs {
            action
            id
            note
            fulfilledBy {
              fulfills {
                action
                fulfilledBy{
                  fulfilledBy {
                    requestDistribution
                  }
                }
              }
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
          workingAgents {
            name
            id
            image
          }
          inputs {
            action
            id
            fulfills {
              fulfilledBy {
                requestDistribution
                provider {
                  name
                  image
                }
                action
                start
                note
                affects {
                  trackingIdentifier
                }
              }
              fulfilledQuantity {
                unit {
                  name
                }
                numericValue
              }
            }
          }
        }
      }
    }
  } 
`

export const queryEvents = gql`
query ($token: String!, $id: Int!) {
    viewer(token: $token) {
        commitment(id: $id) {
          id
          fulfilledBy {
            fulfilledBy {
              action
              start
              id
              requestDistribution
              note
              provider {
                id
                name
                image
              }
            }
            fulfilledQuantity {
              numericValue
              unit {
                name
              }
            }
          }
        }
    }
}
`

const createEvent = gql`
mutation ($token: String!, $action: String!, $requestDistribution: Boolean, $start: String, $scopeId: Int!, $commitmentId: Int!, $note: String, $affectedNumericValue: String!, $affectedUnitId: Int!  ) {
  createEconomicEvent(
    token: $token,
    action: $action,
    start: $start,
    scopeId: $scopeId, 
    requestDistribution: $requestDistribution, 
    fulfillsCommitmentId: $commitmentId,
    note: $note,
    affectedNumericValue: $affectedNumericValue, 
    affectedUnitId: $affectedUnitId, 
    ) {
    economicEvent {
      action
      note
      start
      id
      requestDistribution
      scope {
        id
      }
      provider {
        name
        id
        image
      }
      affectedQuantity {
        unit {
          name
        }
        numericValue
      }
    }
  }
}
`

const updateEvent = gql`
mutation ($token: String!, $id: Int!, $start: String!, $requestDistribution: Boolean, $scopeId: Int!, $note: String, $affectedNumericValue: String!, $affectedUnitId: Int! ) {
  updateEconomicEvent(
    token: $token,
    id: $id,
    start: $start,
    scopeId: $scopeId, 
    requestDistribution: $requestDistribution, 
    note: $note,
    affectedNumericValue: $affectedNumericValue,
    affectedUnitId: $affectedUnitId,
    ) {
      economicEvent {
        action
        note
        start
        id
        requestDistribution
        scope {
          id
        }
        provider {
          name
          id
          image
        }
        affectedQuantity {
          unit {
            name
          }
          numericValue
        }
      }
  }
}`

const mapStateToProps = (state) => {
  return {
    state: state
  }
}

const mapDispatchToProps = (dispatch) => {
  const sendNotif = (id, message, kind, dismissAfter) => {
    notifActions.notifSend({
      message,
      kind,
      id: id,
      dismissAfter: 2000
    })(dispatch)
  }
  return {
    sendNotif
  }
}

const wrapperComponent = compose(
  graphql(createEvent, { name: 'createEventMutation' }),
  graphql(updateEvent, { name: 'updateEventMutation' }),
  withState('action', 'updateAction', 'work'),
  withState('note', 'updateNote', ''),
  withState('numericValue', 'updateNumericValue', '0'),
  withState('unitId', 'updateUnitId', 2),
  withState('requestPayment', 'updatePayment', true),
  withState('startDate', 'updateDate', moment()),
  withHandlers({
    addNote: props => event => {
      event.preventDefault()
      props.updateNote(event.target.value)
    },
    addAction: props => event => {
      event.preventDefault()
      props.updateAction(event.target.value)
    },
    addPayment: props => (val) => {
      props.updatePayment(!val)
    },
    addNumericValue: props => event => {
      event.preventDefault()
      props.updateNumericValue(event.target.value)
    },
    addDate: props => event => {
      props.updateDate(event)
    },
    addUnitId: props => event => {
      event.preventDefault()
      props.updateUnitId(event.target.value)
    },
    log: props => event => {
      event.preventDefault()
      let date = moment(props.startDate).format("YYYY-MM-DD")
      return (
        props.createEventMutation({
          variables: {
            token: localStorage.getItem('oce_token'),
            id: props.id,
            action: props.action,
            scopeId: props.scopeId,
            requestDistribution: props.requestPayment,
            commitmentId: props.commitmentId,
            note: props.note,
            affectedNumericValue: props.numericValue,
            affectedUnitId: props.unitId,
            start: date
          },
          // options: (props) => ({
          update: (store, { data }) => {
            let agentPlanCache = store.readQuery({ query: plan,
              variables: {
                token: localStorage.getItem('oce_token'),
                planId: Number(props.param)
              }}
            )
            let agentEventsCache = store.readQuery({ query: queryEvents,
              variables: {
                token: localStorage.getItem('oce_token'),
                id: Number(props.id)
              }}
            )
            
            let processIndex = agentPlanCache.viewer.plan.planProcesses.findIndex(process => process.committedInputs.some(item => Number(item.id) === Number(props.id)))
            
            let commitmentUpdatedIndex = agentPlanCache.viewer.plan
              .planProcesses[processIndex]
              .committedInputs
              .findIndex(input => {
                return Number(input.id) === Number(props.id)
              })
    
            agentPlanCache.viewer.plan.planProcesses[processIndex].committedInputs[commitmentUpdatedIndex]
            .fulfilledBy.unshift({
              fulfills: {
                action: data.createEconomicEvent.economicEvent.action,
                __typename: 'Commitment'
              },
              __typename: 'Fulfillment'
            })
    
            agentEventsCache.viewer.commitment
            .fulfilledBy.unshift({
              fulfilledBy: {
                action: data.createEconomicEvent.economicEvent.action,
                note: data.createEconomicEvent.economicEvent.note,
                requestDistribution: data.createEconomicEvent.economicEvent.requestDistribution,
                provider: data.createEconomicEvent.economicEvent.provider,
                start: data.createEconomicEvent.economicEvent.start,
                id: data.createEconomicEvent.economicEvent.id,
                __typename: 'EconomicEvent'
              },
              fulfilledQuantity: data.createEconomicEvent.economicEvent.affectedQuantity,
              __typename: 'Fulfillment'
            })
    
            store.writeQuery({ query: plan,
              variables: {
                token: localStorage.getItem('oce_token'),
                id: props.param
              },
              data: agentPlanCache })
    
            store.writeQuery({ query: queryEvents,
              variables: {
                token: localStorage.getItem('oce_token'),
                id: props.id
              },
              data: agentEventsCache })
          }
        })
        // })
        .then((data) => props.sendNotif(Math.random(), '✌️✌️✌️ Work logged correctly', 'success', '5000'))
        .catch((e) => props.sendNotif(Math.random(), e.message, 'danger', '5000'))
      )
    },
    update: props => (event) => {
      event.preventDefault()
      let date = moment(props.startDate).format("YYYY-MM-DD")
      return (
        props.updateEventMutation({
          variables: {
            token: localStorage.getItem('oce_token'),
            id: props.eventId,
            action: props.action,
            scopeId: props.scopeId,
            requestDistribution: props.requestPayment,
            commitmentId: props.commitmentId,
            note: props.note,
            affectedNumericValue: props.numericValue,
            affectedUnitId: props.unitId,
            start: date
          },
          // options: (props) => ({
          update: (store, { data }) => {
            let agentPlanCache = store.readQuery({ query: plan,
              variables: {
                token: localStorage.getItem('oce_token'),
                planId: Number(props.param)
              }}
            )
            let agentEventsCache = store.readQuery({ query: queryEvents,
              variables: {
                token: localStorage.getItem('oce_token'),
                id: Number(props.id)
              }}
            )
            let eventToUpdateId = agentEventsCache.viewer.commitment.fulfilledBy.findIndex(event => Number(event.fulfilledBy.id) === Number(props.eventId))
            let processIndex = agentPlanCache.viewer.plan.planProcesses.findIndex(process => process.committedInputs.some(item => Number(item.id) === Number(props.id)))
            
            let commitmentUpdatedIndex = agentPlanCache.viewer.plan
              .planProcesses[processIndex]
              .committedInputs
              .findIndex(input => {
                return Number(input.id) === Number(props.id)
              })
    
            // let eventUpdatedIndex = agentPlanCache.viewer.plan
            // .planProcesses[processIndex]
            // .committedInputs[commitmentUpdatedIndex]
            // .fulfilledBy
            // .findIndex(input => {
            //   return Number(input.id) === Number(props.id)
            // })

              // console.log(eventUpdatedIndex)
              // console.log(agentPlanCache.viewer.plan
              //   .planProcesses[processIndex]
              //   .committedInputs[commitmentUpdatedIndex])

            agentPlanCache.viewer.plan.planProcesses[processIndex].committedInputs[commitmentUpdatedIndex]
            .fulfilledBy.splice(eventToUpdateId, 1, {
              fulfills: {
                action: data.updateEconomicEvent.economicEvent.action,
                __typename: 'Commitment'
              },
              __typename: 'Fulfillment'
            })
    
            agentEventsCache.viewer.commitment
            .fulfilledBy.splice(eventToUpdateId, 1, {
              fulfilledBy: {
                action: data.updateEconomicEvent.economicEvent.action,
                note: data.updateEconomicEvent.economicEvent.note,
                requestDistribution: data.updateEconomicEvent.economicEvent.requestDistribution,
                provider: data.updateEconomicEvent.economicEvent.provider,
                start: data.updateEconomicEvent.economicEvent.start,
                id: data.updateEconomicEvent.economicEvent.id,
                __typename: 'EconomicEvent'
              },
              fulfilledQuantity: data.updateEconomicEvent.economicEvent.affectedQuantity,
              __typename: 'Fulfillment'
            })
    
            store.writeQuery({ query: plan,
              variables: {
                token: localStorage.getItem('oce_token'),
                id: props.param
              },
              data: agentPlanCache })
    
            store.writeQuery({ query: queryEvents,
              variables: {
                token: localStorage.getItem('oce_token'),
                id: props.id
              },
              data: agentEventsCache })
          }
        })
        //  })
        .then((data) => props.sendNotif(Math.random(), '✌️✌️✌️ Event updated correctly', 'success', '5000'))
        .catch((e) => props.sendNotif(Math.random(), e.message, 'danger', '5000'))
      )
    }
  })
)(Component)

export default connect(mapStateToProps, mapDispatchToProps)(wrapperComponent)
