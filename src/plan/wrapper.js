import { compose, withHandlers, withState } from "recompose";
import Component from "./index";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import moment from "moment";
import {withFormik, Form, Field} from 'formik'
import * as Yup from 'yup'
import createPlan from '../mutations/CreatePlan'


export default compose(
  graphql(createPlan, { name: "createPlanMutation" }),
  withFormik({
    mapPropsToValues: (props) => ({ name: '', note: '', start: moment(), due: moment() }),
    validationSchema: Yup.object().shape({
       name: Yup.string().required(),
       note: Yup.string(),
       start: Yup.string().required(),
       due: Yup.string().required()
    }),
    handleSubmit: (values, {props, resetForm, setErrors, setSubmitting}) => {
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
          return props.history.push(`canvas/${data.data.createPlan.plan.id}`);
        }, (e) => {
          const errors = e.graphQLErrors.map(error => error.message)
          props.setSubmitting(false)
          props.setErrors({ username: ' ', password: ' ', form: errors[0] })
       })
    }
  })
)(Component);
