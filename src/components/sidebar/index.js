import {compose, withHandlers} from 'recompose'
import Component from './sidebar'
import moment from "moment";
import {withFormik} from 'formik'
import * as Yup from 'yup'
import createPlan from '../../mutations/CreatePlan'
import updateNotification from "../../mutations/updateNotification";
import {Icons} from 'oce-components/build'
import { graphql } from "react-apollo";
import React from 'react'

export default compose(
  graphql(createPlan, { name: "createPlanMutation" }),
  graphql(updateNotification, {name: 'updateNotification'}),
  withFormik({
    mapPropsToValues: (props) => ({ name: '', note: '', start: moment(), due: moment() }),
    validationSchema: Yup.object().shape({
       name: Yup.string().required(),
       note: Yup.string(),
       start: Yup.string().required(),
       due: Yup.string().required()
    }),
    handleSubmit: (values, {props}) => {
      let date = moment(values.due).format("YYYY-MM-DD");
      props
        .createPlanMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            name: values.name,
            due: date,
            note: values.note
          }
        })
        .then(data => {
          props.updateNotification({variables: {
            message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Plan {data.data.createPlan.plan.name} created successfully!</div>,
            type: 'success'
          }})
           return props.history.push(`/canvas/${data.data.createPlan.plan.id}`);
        }, (e) => {
          const errors = e.graphQLErrors.map(error => error.message)
          props.updateNotification({variables: {
            message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
            type: 'alert'
          }})
          props.setSubmitting(false)
       })
    }
  }),
  withHandlers({
    logout: props => event => {
      localStorage.removeItem('oce_token')
      window.location.reload()
    }
  })
)(Component)
