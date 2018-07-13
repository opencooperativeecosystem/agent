import {compose, withHandlers, withState} from 'recompose'
import Component from './modalActivities'
import {graphql} from 'react-apollo'
import queryEvents from '../../../queries/getEvents'
import deleteEvent from '../../../mutations/deleteEvent'
import {withFormik } from 'formik'
import * as Yup from 'yup'
import {Icons} from 'oce-components/build'
import React from 'react'
import updateNotification from '../../../mutations/updateNotification'
import deleteNotification from "../../../mutations/deleteNotification"
import moment from 'moment'
import updateEvent from "../../../mutations/updateEvent"


export default compose(
  graphql(deleteNotification, {name: 'deleteNotification'}),
  graphql(updateNotification, {name: 'updateNotification'}),
  graphql(updateEvent, {name: 'updateEventMutation'}),
  graphql(deleteEvent, {
    options: (props) => ({
      refetchQueries: [
        {
          query: queryEvents,
          variables: {
            token: localStorage.getItem('oce_token'),
            id: props.id
          }
        }
      ]
    }),
    props: ({mutate, ownProps: {id}}) => ({
      id, mutate
    })
  }),
  withFormik({
    mapPropsToValues: (props) => ({ action: props.action, note: props.note || '' , numericValue: props.unitvalue, unit: props.unit, requestPayment: true, date: moment() }),
      validationSchema: Yup.object().shape({
        note: Yup.string(),
        numericValue: Yup.string().required(),
        unit: Yup.number(),
        requestPayment: Yup.boolean(),
        date: Yup.string()
      }),
    handleSubmit: (values, {props}) => {
        let date = moment(props.date).format("YYYY-MM-DD")
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
              // let agentPlanCache = store.readQuery({ query: plan,
              //   variables: {
              //     token: localStorage.getItem('oce_token'),
              //     planId: Number(props.param)
              //   }}
              // )
              // let agentEventsCache = store.readQuery({ query: queryEvents,
              //   variables: {
              //     token: localStorage.getItem('oce_token'),
              //     id: Number(props.id)
              //   }}
              // )
              // let eventToUpdateId = agentEventsCache.viewer.commitment.fulfilledBy.findIndex(event => Number(event.fulfilledBy.id) === Number(props.eventId))
              // let processIndex = agentPlanCache.viewer.plan.planProcesses.findIndex(process => process.committedInputs.some(item => Number(item.id) === Number(props.id)))
              
              // let commitmentUpdatedIndex = agentPlanCache.viewer.plan
              //   .planProcesses[processIndex]
              //   .committedInputs
              //   .findIndex(input => {
              //     return Number(input.id) === Number(props.id)
              //   })
              // agentPlanCache.viewer.plan.planProcesses[processIndex].committedInputs[commitmentUpdatedIndex]
              // .fulfilledBy.splice(eventToUpdateId, 1, {
              //   fulfills: {
              //     action: data.updateEconomicEvent.economicEvent.action,
              //     __typename: 'Commitment'
              //   },
              //   __typename: 'Fulfillment'
              // })
      
              // agentEventsCache.viewer.commitment
              // .fulfilledBy.splice(eventToUpdateId, 1, {
              //   fulfilledBy: {
              //     action: data.updateEconomicEvent.economicEvent.action,
              //     note: data.updateEconomicEvent.economicEvent.note,
              //     requestDistribution: data.updateEconomicEvent.economicEvent.requestDistribution,
              //     provider: data.updateEconomicEvent.economicEvent.provider,
              //     start: data.updateEconomicEvent.economicEvent.start,
              //     id: data.updateEconomicEvent.economicEvent.id,
              //     __typename: 'EconomicEvent'
              //   },
              //   fulfilledQuantity: data.updateEconomicEvent.economicEvent.affectedQuantity,
              //   __typename: 'Fulfillment'
              // })
      
              // store.writeQuery({ query: plan,
              //   variables: {
              //     token: localStorage.getItem('oce_token'),
              //     id: props.param
              //   },
              //   data: agentPlanCache })
      
              // store.writeQuery({ query: queryEvents,
              //   variables: {
              //     token: localStorage.getItem('oce_token'),
              //     id: props.id
              //   },
              //   data: agentEventsCache })
            }
          })
          .then((data) => props.updateNotification({variables: {
            message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Event logged successfully!</div>,
            type: 'success'
          }}))
          .catch((e) => {
            const errors = e.graphQLErrors.map(error => error.message)
              props.updateNotification({variables: {
                message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
                type: 'alert'
              }})
          })
        )
    }
  }),
    graphql(queryEvents, {
      options: ({id}) => ({ variables: { token: localStorage.getItem('oce_token'), id: id}}),
      props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
        loading,
        error,
        refetchData: refetch,  // :NOTE: call this in the component to force reload the data
        activities: viewer ? viewer.commitment.fulfilledBy : null
      })
    }),
    // connect(mapStateToProps, mapDispatchToProps),
    withState('deleteEventModal', 'toggleDeleteEvent', false),
    withState('idEventToDelete', 'setIdToDelete', ''),
    withState('editEventModal', 'toggleEditEvent', false),
    withState('idEventToEdit', 'setIdToUpdate', ''),
    withHandlers({
      toggleDeleteEvent: (props) => (status, id) => {
        props.setIdToDelete(id)
        props.toggleDeleteEvent(!status)
      },
      toggleEditEvent: (props) => (status, id) => {
        props.setIdToUpdate(id)
        props.toggleEditEvent(!status)
      },
      deleteEvent: ({toggleDeleteEvent,updateNotification,deleteNotification, deleteEventModal, mutate}) => (id) => {
        return (
          mutate({
            variables: {
              token: localStorage.getItem('oce_token'),
              id: id
            }
          })
          .then(data =>{
            toggleDeleteEvent(!deleteEventModal)
            updateNotification({
                variables: {
                  message: (
                    <div style={{ fontSize: "14px" }}>
                      <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                        <Icons.Bell width="18" height="18" color="white" />
                      </span>Event logged successfully!
                    </div>
                  ),
                  type: "success"
                }
              })
              .then(res => {
                setTimeout(() => {
                  deleteNotification({
                    variables: { id: res.data.addNotification.id }
                  });
                }, 1000);
              })
          })
          .catch(e => {
            toggleDeleteEvent(!deleteEventModal)
            const errors = e.graphQLErrors.map(error => error.message);
              updateNotification({
                variables: {
                  message: (
                    <div style={{ fontSize: "14px" }}>
                      <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                        <Icons.Cross width="18" height="18" color="white" />
                      </span>
                      {errors}
                    </div>
                  ),
                  type: "alert"
                }
              })
              .then(res => {
                setTimeout(() => {
                  deleteNotification({
                    variables: { id: res.data.addNotification.id }
                  });
                }, 1000);
              });
          })
        )
      }
    })
  )(Component)
