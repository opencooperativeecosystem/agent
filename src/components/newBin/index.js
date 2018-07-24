import React from "react";
import { NewBin, Input, Icons, Textarea, Select } from "oce-components/build";
import CreateProcess from "../../mutations/createProcess";
import { compose, withState, withHandlers } from "recompose";
import moment from "moment";
import Plan from "../../queries/getPlan";
import {Field, Form, withFormik } from 'formik'
import { graphql } from "react-apollo";
import * as Yup from 'yup'
import DatePicker from "react-datepicker";
import Alert from '../alert'
import style from './style.css'
import updateNotification from "../../mutations/updateNotification";
import deleteNotification from "../../mutations/deleteNotification";
require("react-datepicker/dist/react-datepicker-cssmodules.css");

const Bin = ({
  param,
  values,
  relationships,
  clicked,
  toggleClicked,
  setFieldValue,
  setFieldTouched,
  errors,
  startDate,
  due,
  touched
}) => {
  return (
    <span>
      <Form style={{display: 'initial'}}>
        <NewBin clicked={clicked} toggleClicked={toggleClicked}>
          <div>
          <Field
            name="name"
            render={({ field /* _form */ }) => (
              <Input name={field.name} onChange={field.onChange} placeholder="type the process name" />
            )}
          />
          {errors.name && touched.name && <Alert>{errors.name}</Alert>}
          </div>
          <div style={{marginTop: '10px', height: '150px'}}>
          <Field
            name="note"
            render={({ field /* _form */ }) => (
              <Textarea name={field.name} onChange={field.onChange} placeholder="type the process note" />
            )}
          />
          {errors.note && touched.note && <Alert>{errors.note}</Alert>}
          </div>
          <div style={{marginTop: '10px'}}>
          <Field
            name="scope"
            render={({ field /* _form */ }) => (
              <Select name={field.name} onChange={field.onChange}>
                {relationships.map((opt) => opt)}
              </Select>
            )}
          />
          {errors.scope && touched.scope && <Alert>{errors.scope}</Alert>}
          </div>
          {/* <StartDate 
            value={values.start}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.start}
            touched={touched.start}
            startDate={startDate}
            due={due}
          /> */}
          <div className={style.dates}>
            <div className={style.dateWrapper}>
              <h5 className={style.dateName}><span style={{verticalAlign: 'sub'}}><Icons.Calendar width='16' height='16' color='#707BA0' /></span> Start</h5>
              <StartDate
                value={values.start}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.start}
                touched={touched.start}
                startDate={startDate}
                due={due}
              />
            </div>
            <div className={style.dateWrapper}>
              <h5 className={style.dateName}><span style={{verticalAlign: 'sub'}}><Icons.Calendar width='16' height='16' color='#707BA0' /></span> Due</h5>
              <DueDate
                value={values.due}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.due}
                touched={touched.due}
                startDate={startDate}
                due={due}
              />
            </div>
          </div>
        </NewBin>
      </Form>
    </span>
  );
};


const StartDate = (props) => {
  const handleChange = value => {
    props.onChange('start', value);
  };
  return (
    <div>
      <DatePicker
      selected={props.value}
      onChange={handleChange}
      dateFormat={'DD MMM YYYY'}
      minDate={moment(props.startDate, moment.ISO_8601)}
      maxDate={moment(props.due, moment.ISO_8601)}
      withPortal
    />
    {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  )
}

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
      minDate={moment(props.startDate, moment.ISO_8601)}
      maxDate={moment(props.due, moment.ISO_8601)}
      withPortal
    />
    {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  )
}


export default compose(
  withState("clicked", "handleClicked", false),
  graphql(CreateProcess, { name: "createProcessMutation" }),
  graphql(updateNotification, {name: 'updateNotification'}),
  graphql(deleteNotification, {name: 'deleteNotification'}),
  withHandlers({
    toggleClicked: props => () => {
      props.handleClicked(!props.clicked);
    },
  }),
  withFormik({
      mapPropsToValues: (props) => ({ name: '', note: '', scope: props.relationships[0].props.value, start: moment(props.startDate), due: moment(props.startDate) }),
      validationSchema: Yup.object().shape({
          name: Yup.string().required(),
          note: Yup.string(),
          scope: Yup.string().required(),
          start: Yup.string(),
          due: Yup.string(),
      }),
      handleSubmit: (values, {props, resetForm, setErrors, setSubmitting}) => {
        setSubmitting(true)
        props
          .createProcessMutation({
            variables: {
              token: localStorage.getItem('oce_token'),
              name: values.name,
              planned: moment(values.start).format("YYYY-MM-DD"),
              planId: props.param,
              note: values.note,
              scope: Number(values.scope),
              plannedFinish: moment(values.due).format("YYYY-MM-DD")
            },
            update: (cache, {data: {createProcess}}) => {
                const data = cache.readQuery({query: Plan, variables: {
                    token: localStorage.getItem('oce_token'),
                    planId: Number(props.param)
                  }})
                data.viewer.plan.planProcesses.push(createProcess.process)
                cache.writeQuery({
                  query: Plan,
                  data,
                  variables: {
                    token: localStorage.getItem("oce_token"),
                    planId: Number(props.param)
                  }
                })
            }
          })
          .then(data => {
            props.toggleClicked()
            setSubmitting(false)
            props.updateNotification({variables: {
              message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Process {data.data.createProcess.process.name} created successfully!</div>,
              type: 'success'
            }})
            .then(res => {
              setTimeout(() => {
               props.deleteNotification({variables: {id: res.data.addNotification.id}})
             }, 1000);
            })
          }, (e) => {
            props.toggleClicked()
            setSubmitting(false)
            const errors = e.graphQLErrors.map(error => error.message)
            props.setSubmitting(false)
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
      }
  })
)(Bin);
