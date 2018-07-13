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
import deleteNotification from "../../mutations/deleteNotification";
import DatePicker from 'react-datepicker'
import moment from 'moment'
require("react-datepicker/dist/react-datepicker-cssmodules.css")

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
            <Textarea {...field} value={field.value} placeholder="Type the process note..." />
          )}
        />
        {props.errors.title &&
          props.touched.title && <Alert>{props.errors.title}</Alert>}
      </div>
      <div className={style.dates}>
        {/* <div className={style.dateWrapper}>
          <h5 className={style.dateName}><span style={{verticalAlign: 'sub'}}><Icons.Calendar width='16' height='16' color='#707BA0' /></span> Start</h5>
          <StartDate
            value={props.values.start}
            onChange={props.setFieldValue}
            onBlur={props.setFieldTouched}
            error={props.errors.start}
            touched={props.touched.start}
            start={props.start}
          />
        </div> */}
        <div className={style.dateWrapper}>
          <h5 className={style.dateName}><span style={{verticalAlign: 'sub'}}><Icons.Calendar width='16' height='16' color='#707BA0' /></span> Due</h5>
          <DueDate
            value={props.values.due}
            onChange={props.setFieldValue}
            onBlur={props.setFieldTouched}
            error={props.errors.due}
            touched={props.touched.due}
            due={props.due}
          />
        </div>
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
    {props.isDeletable ?
    <div className={style.deletePlanWrapper}>
      <h3 className={style.archiveTitle}>Do you want to delete the plan?</h3>
      <h5 className={style.archiveDesc}>If there are events logged, it will not be possible to delete it</h5>
      <Button primary onClick={props.deletePlan}>Delete</Button>
    </div>
    : null
    }
  </div>
);


// const StartDate = (props) => {
//   const handleChange = value => {
//     props.onChange('start', value);
//   };
//   return (
//     <div>
//       <DatePicker
//       selected={props.value}
//       onChange={handleChange}
//       dateFormat={'DD MMM YYYY'}
//       withPortal
//     />
//     {props.error && props.touched && <Alert>{props.error}</Alert>}
//     </div>
//   )
// }

const DueDate = (props) => {
  const handleChange = value => {
    props.onChange('due', value);
  };
  return (
    <div>
    <DatePicker
      selected={props.value}
      onChange={handleChange}
      dateFormat={'DD MMM YYYY'}
      withPortal
    />
    {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  )
}

export default compose(
  graphql(updatePlan, { name: "updatePlanMutation" }),
  graphql(deletePlan, { name: "deletePlanMutation" }),
  graphql(updateNotification, {name: 'updateNotification'}),
  graphql(deleteNotification, {name: 'deleteNotification'}),
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
                  props.updateNotification({variables: {
                      message: <div className={style.message}><span><Icons.Bell width='18' height='18' color='white' /></span>Plan {data.data.deletePlan.plan.name} deleted successfully!</div>,
                      type: 'success'
                    }
                  })
                  .then(res => {
                    setTimeout(() => {
                     props.deleteNotification({variables: {id: res.data.addNotification.id}})
                   }, 1000);
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
                  .then(res => {
                    setTimeout(() => {
                     props.deleteNotification({variables: {id: res.data.addNotification.id}})
                   }, 1000);
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
      due: moment(props.due) || moment()
    }),
    validationSchema: Yup.object().shape({
      title: Yup.string(),
      note: Yup.string(),
      due: Yup.string()
    }),
    handleSubmit: (values, { props }) => {
      props
        .updatePlanMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            id: props.planId,
            name: values.title,
            note: values.note,
            due: moment(values.due).format("YYYY-MM-DD")
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
            planCache.viewer.plan.plannedOn = data.updatePlan.plan.plannedOn;
            planCache.viewer.plan.due = data.updatePlan.plan.due;
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
          .then(res => {
            setTimeout(() => {
             props.deleteNotification({variables: {id: res.data.addNotification.id}})
           }, 1000);
          })
          },
          e => {
            const errors = e.graphQLErrors.map(error => error.message);
            props.updateNotification({variables: {
              message: <div className={style.message}><span><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
              type: 'alert'
            }})
            .then(res => {
              setTimeout(() => {
               props.deleteNotification({variables: {id: res.data.addNotification.id}})
             }, 1000);
            })
            props.setSubmitting(false);
          }
        );
    }
  })
)(PlanModal);
