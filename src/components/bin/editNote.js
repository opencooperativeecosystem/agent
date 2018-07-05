import React from 'react'
import style from './style.css'
import {Textarea, Icons, Button} from 'oce-components/build'
import {Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import Alert from '../alert'
import Plan from "../../queries/getPlan";
import UpdateProcess from "../../mutations/updateProcess";
import { graphql, compose } from "react-apollo";
import updateNotification from "../../mutations/updateNotification";
import deleteNotification from "../../mutations/deleteNotification";

const EditNote = (props) => (
  <Form>
    <span className={style.form_note}>
      <Field name="note" render={({ field /* _form */ }) => (<Textarea {...field} placeholder='Type the process note...' />)} />
      {props.errors.note && props.touched.note && <Alert>{props.errors.note}</Alert>}
    </span>
    <Button>Update note</Button>
  </Form>
)

export default compose(
    graphql(UpdateProcess, { name: "updateProcessMutation" }),
    graphql(updateNotification, {name: 'updateNotification'}),
    graphql(deleteNotification, {name: 'deleteNotification'}),
    withFormik({
      mapPropsToValues: (props) => ({ note: '' }),
      validationSchema: Yup.object().shape({
         note: Yup.string().required()
      }),
      handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
        props
          .updateProcessMutation({
            variables: {
              token: localStorage.getItem("oce_token"),
              id: props.id,
              note: values.note
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
              ].note =
                data.updateProcess.process.note;
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
                message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Note updated successfully!</div>,
                type: 'success'
              }})
              .then(res => {
                setTimeout(() => {
                 props.deleteNotification({variables: {id: res.data.addNotification.id}})
               }, 1000);
              })
            },
            e => {
              const errors = e.graphQLErrors.map(error => error.message);
              props.updateNotification({variables: {
                message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
                type: 'alert'
              }})
              .then(res => {
                setTimeout(() => {
                props.deleteNotification({variables: {id: res.data.addNotification.id}})
              }, 1000);
              })
            }
          );
      }
    })
) 
(EditNote);
