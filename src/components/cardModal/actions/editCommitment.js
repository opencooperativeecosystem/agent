import React from "react";
import { SupTitle, Input, Button, Select, Icons } from "oce-components/build";
import { graphql } from "react-apollo";
import { compose, withState, withHandlers } from "recompose";
import getResourcesQuery from "../../../queries/getResources";
import getUnitsQuery from "../../../queries/getUnits";
import style from '../index.css'
import Plan from "../../../queries/getPlan";
import {Form, withFormik, Field} from 'formik' 
import * as Yup from 'yup'
import updateNotification from "../../../mutations/updateNotification";
import Alert from '../../alert'
import updateCommitment from "../../../mutations/updateCommitment";
require("react-datepicker/dist/react-datepicker-cssmodules.css");

const events = [
  "Accept",
  "Cite",
  "Consume",
  "Give",
  "Improve",
  "Produce",
  "Take",
  "Use",
  "Work"
];
let options = events.map((ev, i) => (
  <option key={i} value={ev}>
    {ev}
  </option>
));
options.unshift(
  <option defaultValue="" key={"383737ehshdh"}>
    Select your event
  </option>
);

const NewCommModal = ({
  match,
  scopeId,
  planId,
  processId,
  modalIsOpen,
  toggleNewCommitmentModal,
  handleEvent,
  handleSubmit,
  setFieldValue,
  setFieldTouched,
  errors,
  touched,
  values,
  client,
  resources,
  dueDate,
  units
}) => {
  let resourcesOptions = resources.map((ev, i) => (
    <option key={i} value={ev.id}>
      {ev.name}
    </option>
  ));
  resourcesOptions.unshift(
    <option defaultValue="" key={"383737ehshdh"}>
      Select your resource
    </option>
  );
  let unitsOptions = units.map((ev, i) => (
    <option key={i} value={ev.id}>
      {ev.name}
    </option>
  ));
  unitsOptions.unshift(
    <option defaultValue="" key={"383737ehshdh"}>
      Select your units
    </option>
  );
  return (
    <Form>
    <div style={{padding: '10px'}}>
        <SupTitle dark icon={<Icons.Text widht='18' height='18' color='#383C39' />} text='New commitment' />
        <div className={style.commitmentWrapper}>
            <div className={style.commInput}>
              <EventSelect 
                value={values.event}
                onChange={setFieldValue}
                error={errors.start}
                touched={touched.start}
                handleEvent={handleEvent}
                options={options}
                client={client}
              />
              {errors.event && touched.event && <Alert>{errors.event}</Alert>}
            </div>
            <div className={style.commInput}>
            <Field
              name="resource"
              render={({ field /* _form */ }) => (
                <Select type={'gray'} name={field.name} onChange={field.onChange}>{resourcesOptions.map((opt) => opt)}</Select>
              )}
            />
            {errors.resource && touched.resource && <Alert>{errors.resource}</Alert>}
            </div>
            <div className={style.commInput}>
              <Field
                name="qty"
                render={({ field /* _form */ }) => (
                  <Input type={'gray'} name={field.name} onChange={field.onChange} placeholder='00.00' />
                )}
              />
              {errors.qty && touched.qty && <Alert>{errors.qty}</Alert>}
            </div>
            <div className={style.commInput}>
              <Field
                name="unit"
                render={({ field /* _form */ }) => (
                  <Select type={'gray'} name={field.name} onChange={field.onChange}>{unitsOptions.map((opt) => opt)}</Select>
                )}
              />
              {errors.unit && touched.unit && <Alert>{errors.unit}</Alert>}
            </div>
        </div>
        
        <div>
            <Button>Publish</Button>
        </div>
    </div>
    </Form>
     
  );
};


const EventSelect = (props) => {
  const handleChange = value => {
    props.onChange('event', value.target.value)
    props.handleEvent(props.client, value)
  }
  return (
    <div>
      <Select name={'event'} onChange={handleChange}>{props.options.map((opt) => opt)}</Select>
      {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  )
}





export default compose(
  withState("resources", "onResourcesArray", []),
  withState("units", "onUnitsArray", []),
  graphql(updateNotification, {name: 'updateNotification'}),
  withFormik({
    mapPropsToValues: () => ({ event: '', resource: '', qty: '', unit: ''}),
    validationSchema: Yup.object().shape({
      event: Yup.string().required(),
      resource: Yup.string().required(),
      qty: Yup.number().required(),
      unit: Yup.string().required(),
    }),
    handleSubmit: (values, {props, resetForm, setErrors, setSubmitting}) => {
      return props.client.mutate({
          mutation: updateCommitment,
          variables: {
              token: localStorage.getItem("oce_token"),
              id: props.id,
              action: values.event.toLowerCase(),
              committedResourceClassifiedAsId: values.resource,
              committedUnitId: values.unit,
              committedNumericValue: values.qty,
          },
          update: (cache, {data: {updateCommitment}}) => {
            const data = cache.readQuery({query: Plan, variables: {
              token: localStorage.getItem('oce_token'),
              planId: Number(props.planId)
          }})
          const processIndex = data.viewer.plan.planProcesses.findIndex(process => Number(process.id) === Number(props.processId))
          if (updateCommitment.commitment.action == 'work') {
              data.viewer.plan.planProcesses[processIndex].committedInputs.push(updateCommitment.commitment)
            } else {
                data.viewer.plan.planProcesses[processIndex].committedOutputs.push(updateCommitment.commitment)
          }
            cache.writeQuery({
                query: Plan,
                data,
                variables: {
                  token: localStorage.getItem("oce_token"),
                  planId: Number(props.planId)
                }
            })
        }
      })
      .then(res => props.updateNotification({variables: {
        message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Commitment created successfully!</div>,
        type: 'success'
      }}))
      .catch(e => {
      const errors = e.graphQLErrors.map(error => error.message)
      props.updateNotification({variables: {
        message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
        type: 'alert'
      }})})
    }
  }),
  withHandlers({
    handleEvent: props => (client, ev) => {
      return client
        .query({
          query: getResourcesQuery,
          variables: {
            token: localStorage.getItem("oce_token"),
            action: ev.target.value.toUpperCase()
          }
        })
        .then(res => {
          client.writeData({
            data: {
              activeResources: res.data.viewer.resourceClassificationsByAction
            }
          });
          props.onResourcesArray(
            res.data.viewer.resourceClassificationsByAction || []
          );
          client.query({
            query: getUnitsQuery,
            variables: {
                token: localStorage.getItem("oce_token"),
            }
            })
            .then(res => {
                props.onUnitsArray(
                    res.data.viewer.allUnits || []
                )
            })
        })
        .catch(e => console.log(e));
    },
  })
)(NewCommModal);
