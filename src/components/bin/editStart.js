import React from 'react'
import style from './style.css'
import {Textarea, Icons, Button} from 'oce-components/build'
import {Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import Alert from '../alert'
import updateNotification from "../../mutations/updateNotification";
import Plan from "../../queries/getPlan";
import UpdateProcess from "../../mutations/updateProcess";
import { graphql, compose } from "react-apollo";
import DatePicker from "react-datepicker";
import moment from 'moment'
require("react-datepicker/dist/react-datepicker-cssmodules.css");

const EditStart = (props) => (
  <Form>
    <StartDate 
        value={props.values.start}
        onChange={props.setFieldValue}
        onBlur={props.setFieldTouched}
        error={props.errors.start}
        touched={props.touched.start}
    />
    <Button>Update Start</Button>
  </Form>
)


const StartDate = (props) => {
    const handleChange = value => {
      props.onChange('start', value);
    };
    return (
      <div className={style.dateWrapper}>
        <DatePicker
            selected={props.value}
            onChange={handleChange}
            dateFormatCalendar={'DD MMM YYYY'}
        />
      {props.error && props.touched && <Alert>{props.error}</Alert>}
      </div>
    )
  }
  

export default compose(
    graphql(UpdateProcess, { name: "updateProcessMutation" }),
    graphql(updateNotification, {name: 'updateNotification'}),
    withFormik({
      mapPropsToValues: (props) => ({ start: moment() }),
      validationSchema: Yup.object().shape({
         start: Yup.string().required()
      }),
      handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
        props
          .updateProcessMutation({
            variables: {
              token: localStorage.getItem("oce_token"),
              id: props.id,
              start: moment(values.start).format("YYYY-MM-DD"),
            },
            update: (store, { data }) => {
              let planProcessesCache = store.readQuery({
                query: Plan,
                variables: {
                  token: localStorage.getItem("oce_token"),
                  planId: Number(props.planId)
                }
              });
    
              const processToUpdateIndex = planProcessesCache.viewer.plan.planProcesses.findIndex(
                proc => proc.id === data.updateProcess.process.id
              );
              planProcessesCache.viewer.plan.planProcesses[
                processToUpdateIndex
              ].plannedStart =
                data.updateProcess.process.plannedStart;
              store.writeQuery({
                query: Plan,
                variables: {
                  token: localStorage.getItem("oce_token"),
                  planId: Number(props.planId)
                },
                data: planProcessesCache
              });
            }
          })
          .then(
            data => {
              props.updateNotification({variables: {
                message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Date updated successfully!</div>,
                type: 'success'
              }})
            },
            e => {
              const errors = e.graphQLErrors.map(error => error.message);
              props.updateNotification({variables: {
                message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
                type: 'alert'
              }})
            }
          );
      }
    })
) 
(EditStart);
