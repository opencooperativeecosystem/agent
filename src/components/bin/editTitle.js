import React from "react";
import style from "./style.css";
import { Input, Button, Icons } from "oce-components/build";
import UpdateProcess from "../../mutations/updateProcess";
import { Form, Field, withFormik } from "formik";
import { graphql, compose } from "react-apollo";
import * as Yup from "yup";
import Alert from "../alert";
import Plan from "../../queries/getPlan";
import updateNotification from "../../mutations/updateNotification";
import deleteNotification from "../../mutations/deleteNotification";

const EditTitle = props => (
  <Form>
    <span className={style.form_input}>
      <Field
        name="title"
        render={({ field /* _form */ }) => (
          <Input {...field} placeholder="Type the process title..." />
        )}
      />
      {props.errors.title &&
        props.touched.title && <Alert>{props.errors.title}</Alert>}
    </span>
    <Button>Update Title</Button>
  </Form>
);

export default compose(
  graphql(UpdateProcess, { name: "updateProcessMutation" }),
  graphql(updateNotification, {name: 'updateNotification'}),
  graphql(deleteNotification, {name: 'deleteNotification'}),
  withFormik({
    mapPropsToValues: props => ({ title: "" }),
    validationSchema: Yup.object().shape({
      title: Yup.string().required()
    }),
    handleSubmit: (values, { props }) => {
      props
        .updateProcessMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            id: props.id,
            name: values.title
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
            ].name =
              data.updateProcess.process.name;
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
              message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Title updated successfully!</div>,
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
)(EditTitle);
