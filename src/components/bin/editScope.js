import React from "react";
import style from "./style.css";
import { Select, Icons, Button } from "oce-components/build";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import Alert from "../alert";
import Plan from "../../queries/getPlan";
import UpdateProcess from "../../mutations/updateProcess";
import { graphql, compose } from "react-apollo";
import updateNotification from "../../mutations/updateNotification";
import deleteNotification from "../../mutations/deleteNotification";

const EditScope = props => {
//   console.log(props.scope)
//   let updateRelationships = props.relationships.map((rel, i) => {
//       let select
//     if (Number(rel.object.id) !== Number(props.scope)) {
//         select = <option key={i} value={rel.object.id}>
//           {rel.object.name}
//         </option>
//     } else {
//         select = <option selected='selected' key={i} value={rel.object.id}>
//           {rel.object.name}
//         </option>
//     }
//     return select
//   })
//   console.log(updateRelationships)
  return (
  <Form>
    <span className={style.form_scope}>
      <Field
        name="scope"
        render={({ field /* _form */ }) => (
          <Select defaultValue={props.scope} name={field.name} onChange={field.onChange}>
            {props.relationships.map(opt => opt)}
          </Select>
        )}
      />
      {props.errors.scope && props.touched.scope && <Alert>{props.errors.scope}</Alert>}
    </span>
    <Button>Update scope</Button>
  </Form>
)};

export default compose(
  graphql(UpdateProcess, { name: "updateProcessMutation" }),
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  withFormik({
    mapPropsToValues: props => ({ scope: props.scope || "" }),
    validationSchema: Yup.object().shape({
      scope: Yup.string().required()
    }),
    handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
      props
        .updateProcessMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            id: props.id,
            scopeId: values.scope
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
            ].scope =
              data.updateProcess.process.scope;
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
            props
              .updateNotification({
                variables: {
                  message: (
                    <div style={{ fontSize: "14px" }}>
                      <span
                        style={{ marginRight: "10px", verticalAlign: "sub" }}
                      >
                        <Icons.Bell width="18" height="18" color="white" />
                      </span>Scope updated successfully!
                    </div>
                  ),
                  type: "success"
                }
              })
              .then(res => {
                setTimeout(() => {
                  props.deleteNotification({
                    variables: { id: res.data.addNotification.id }
                  });
                }, 1000);
              });
          },
          e => {
            const errors = e.graphQLErrors.map(error => error.message);
            props
              .updateNotification({
                variables: {
                  message: (
                    <div style={{ fontSize: "14px" }}>
                      <span
                        style={{ marginRight: "10px", verticalAlign: "sub" }}
                      >
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
                  props.deleteNotification({
                    variables: { id: res.data.addNotification.id }
                  });
                }, 1000);
              });
          }
        );
    }
  })
)(EditScope);
