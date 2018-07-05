import {compose, withHandlers, withState} from 'recompose'
import Component from './logEvent'
import {graphql} from 'react-apollo'
import moment from 'moment'
import React from 'react'
import {Icons} from 'oce-components/build'
import updateNotification from "../../../mutations/updateNotification"
import deleteNotification from "../../../mutations/deleteNotification"
import queryEvents from '../../../queries/getEvents'
import plan from '../../../queries/getPlan'
import createEvent from "../../../mutations/createEvent"
import updateEvent from "../../../mutations/updateEvent"

const wrapperComponent = compose(
  graphql(createEvent, { name: 'createEventMutation' }),
  graphql(updateEvent, { name: 'updateEventMutation' }),
  graphql(updateNotification, {name: 'updateNotification'}),
  graphql(deleteNotification, {name: 'deleteNotification'}),
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
            // let agentEventsCache = store.readQuery({ query: queryEvents,
            //   variables: {
            //     token: localStorage.getItem('oce_token'),
            //     id: props.id
            //   }}
            // )
            
            let processIndex = agentPlanCache.viewer.plan.planProcesses.findIndex(process => process.committedInputs.some(item => Number(item.id) === Number(props.id)))
            let commitmentUpdatedIndex = agentPlanCache.viewer.plan
              .planProcesses[processIndex]
              .committedInputs
              .findIndex(input => {
                return Number(input.id) === Number(props.id)
              })
            agentPlanCache.viewer.plan.planProcesses[processIndex].committedInputs[commitmentUpdatedIndex]
            .fulfilledBy.unshift({
              fulfilledQuantity: {
                numericValue: data.createEconomicEvent.economicEvent.affectedQuantity.numericValue,
                unit: {
                  name: data.createEconomicEvent.economicEvent.affectedQuantity.unit.name,
                  __typename: 'Unit'
                },
                __typename: 'QuantityValue'
              },
              fulfilledBy: {
                  action: data.createEconomicEvent.economicEvent.action,
                  requestDistribution: data.createEconomicEvent.economicEvent.requestDistribution,
                  start: data.createEconomicEvent.economicEvent.start,
                  id: data.createEconomicEvent.economicEvent.id,
                  note: data.createEconomicEvent.economicEvent.note,
                  provider: data.createEconomicEvent.economicEvent.provider,
                  __typename: 'EconomicEvent'
              },
            __typename: 'Fulfillment'
              })
            store.writeQuery({ query: plan,
              variables: {
                token: localStorage.getItem('oce_token'),
                id: props.param
              },
              data: agentPlanCache })
          }
        })
        .then((data) => props.updateNotification({variables: {
          message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Event logged successfully!</div>,
          type: 'success'
        }})
        .then(res => {
          setTimeout(() => {
           props.deleteNotification({variables: {id: res.data.addNotification.id}})
         }, 1000);
        })
      )
        .catch((e) => {
          const errors = e.graphQLErrors.map(error => error.message)
            props.updateNotification({variables: {
              message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
              type: 'alert'
            }})
            .then(res => {
              setTimeout(() => {
               props.deleteNotification({variables: {id: res.data.addNotification.id}})
             }, 1000);
            })
        })
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
        .then((data) => props.updateNotification({variables: {
          message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Event logged successfully!</div>,
          type: 'success'
        }})
        .then(res => {
          setTimeout(() => {
           props.deleteNotification({variables: {id: res.data.addNotification.id}})
         }, 1000);
        })
      )
        .catch((e) => {
          const errors = e.graphQLErrors.map(error => error.message)
            props.updateNotification({variables: {
              message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
              type: 'alert'
            }})
            .then(res => {
              setTimeout(() => {
               props.deleteNotification({variables: {id: res.data.addNotification.id}})
             }, 1000);
            })
        })
      )
    }
  })
)(Component)

export default wrapperComponent
