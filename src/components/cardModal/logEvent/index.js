import {compose, withHandlers} from 'recompose'
import Component from './logEvent'
import {graphql} from 'react-apollo'
import moment from 'moment'
import React from 'react'
import {Icons} from 'oce-components/build'
import deleteNotification from "../../../mutations/deleteNotification"
import queryEvents from '../../../queries/getEvents'
import plan from '../../../queries/getPlan'
import createEvent from "../../../mutations/createEvent"
import {withFormik } from 'formik'
import * as Yup from 'yup'

const wrapperComponent = compose(
  graphql(createEvent, { name: 'createEventMutation' }),
  graphql(deleteNotification, {name: 'deleteNotification'}),
  withFormik({
    mapPropsToValues: (props) => ({ action: props.action, note: '', numericValue: '00.00', unit: '2', requestPayment: true, date: moment() }),
    validationSchema: Yup.object().shape({
        note: Yup.string(),
        numericValue: Yup.string().required(),
        unit: Yup.number(),
        requestPayment: Yup.boolean(),
        date: Yup.string()
    }),
    handleSubmit: (values, {props, resetForm, setErrors, setSubmitting}) => {
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
          console.log(errors)
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
