import React from "react";
import { withFormik, Form, Field } from "formik";
import { graphql, compose } from "react-apollo";
import * as Yup from "yup";
import { Icons, Button, Input, Textarea } from "oce-components/build";
import Alert from "../alert";
import Plan from "../../queries/getPlan";
import agentPlans from "../../queries/getAgentPlans";
import style from "./style.css";
import updatePlan from '../../mutations/updatePlan'
import deletePlan from '../../mutations/deletePlan'
import {withHandlers} from 'recompose'
import updateNotification from "../../mutations/updateNotification";

const PlanModal = props => (
  <div className={style.planModal}>
    <h1>Edit Plan</h1>
    <div className={style.formWrapper}>
    <Form>
      <div className={style.form_input}>
        <Field
          name="title"
          render={({ field /* _form */ }) => (
            <Input {...field} placeholder="Type the process title..." />
          )}
        />
        {props.errors.title &&
          props.touched.title && <Alert>{props.errors.title}</Alert>}
      </div>
      <div className={style.form_note}>
        <Field
          name="note"
          render={({ field /* _form */ }) => (
            <Textarea {...field} placeholder="Type the process note..." />
          )}
        />
        {props.errors.title &&
          props.touched.title && <Alert>{props.errors.title}</Alert>}
      </div>
      {/* <div className={style.form_note}>
      <label>
        <Field type="checkbox" name="status" checked={props.values.status}/>
         Plan completed
        </label>
      </div> */}
      <Button>Update Plan</Button>
    </Form>
    </div>
    <div className={style.deletePlanWrapper}>
    <h3 className={style.archiveTitle}>Do you want to archive the plan?</h3>
    <h5 className={style.archiveDesc}>If there are events logged, it will not be possible to archive it</h5>
    <Button primary onClick={props.deletePlan}>Archive</Button>
    </div>
  </div>
);

export default compose(
  graphql(updatePlan, { name: "updatePlanMutation" }),
  graphql(deletePlan, { name: "deletePlanMutation" }),
  graphql(updateNotification, {name: 'updateNotification'}),
  withHandlers({
    deletePlan: props => event => {
        event.preventDefault()
        props.deletePlanMutation({
            variables: {
                token: localStorage.getItem("oce_token"),
                id: props.planId
            },
            update: (store, { data }) => {
                let plansCache = store.readQuery({
                    query: agentPlans,
                    variables: {
                        token: localStorage.getItem("oce_token"),
                    }
                });
                const planToDeleteIndex = plansCache.viewer.myAgent.agentPlans.findIndex(
                    plan => plan.id === props.planId
                );
                plansCache.viewer.myAgent.agentPlans.splice(planToDeleteIndex, 1)
                store.writeQuery({
                    query: agentPlans,
                    variables: {
                        token: localStorage.getItem("oce_token"),
                        id: localStorage.getItem("agent_id")
                    },
                    data: plansCache
                });
            }
        })
            .then(
                data => {
                  console.log(data)
                  props.updateNotification({variables: {
                      message: <div className={style.message}><span><Icons.Bell width='18' height='18' color='white' /></span>Plan {data.data.deletePlan.plan.name} deleted successfully!</div>,
                      type: 'success'
                    }
                  })
                  props.history.replace('/')
                },
                e => {
                    const errors = e.graphQLErrors.map(error => error.message);
                    props.updateNotification({variables: {
                      message: <div className={style.message}><span><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
                      type: 'alert'
                    }
                  })
                }
            );
    }
}),
  withFormik({
    mapPropsToValues: props => ({
      title: props.title || "",
      note: props.note || "",
      status: props.status || false,
    }),
    validationSchema: Yup.object().shape({
      title: Yup.string(),
      note: Yup.string(),
    }),
    handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
      props
        .updatePlanMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            id: props.planId,
            name: values.title,
            note: values.note,
          },
          update: (store, { data }) => {
            let planCache = store.readQuery({
              query: Plan,
              variables: {
                token: localStorage.getItem("oce_token"),
                planId: Number(props.planId)
              }
            });

            planCache.viewer.plan.name = data.updatePlan.plan.name;
            planCache.viewer.plan.note = data.updatePlan.plan.note;
            planCache.viewer.plan.isFinished = data.updatePlan.plan.isFinished;
            store.writeQuery({
              query: Plan,
              variables: {
                token: localStorage.getItem("oce_token"),
                planId: Number(props.planId)
              },
              data: planCache
            });
          }
        })
        .then(
          data => {
            props.updateNotification({variables: {
              message: <div className={style.message}><span><Icons.Bell width='18' height='18' color='white' /></span>Plan updated successfully!</div>,
              type: 'success'
            }
          })
          },
          e => {
            const errors = e.graphQLErrors.map(error => error.message);
            props.updateNotification({variables: {
              message: <div className={style.message}><span><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
              type: 'alert'
            }})
            props.setSubmitting(false);
          }
        );
    }
  })
)(PlanModal);
