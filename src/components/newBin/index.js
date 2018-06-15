import React from "react";
import { NewBin, Input, Textarea, Select } from "oce-components/build";
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
          <StartDate 
            value={values.start}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.start}
            touched={touched.start}
          />
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
    <div className={style.dateWrapper}>
      <h5 className={style.dateName}>Start</h5>
      <DatePicker
      selected={props.value}
      onChange={handleChange}
      dateFormatCalendar={'DD MMM YYYY'}
      withPortal
    />
    {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  )
}



export default compose(
  withState("clicked", "handleClicked", false),
  graphql(CreateProcess, { name: "createProcessMutation" }),
  withHandlers({
    toggleClicked: props => () => {
      props.handleClicked(!props.clicked);
    },
  }),
  withFormik({
      mapPropsToValues: () => ({ name: '', note: '', scope: '', start: moment() }),
      validationSchema: Yup.object().shape({
          name: Yup.string().required(),
          note: Yup.string(),
          scope: Yup.string().required(),
          start: Yup.string(),
      }),
      handleSubmit: (values, {props, resetForm, setErrors, setSubmitting}) => {
        console.log(props)
        props
          .createProcessMutation({
            variables: {
              token: localStorage.getItem('oce_token'),
              name: values.name,
              planned: moment(values.start).format("YYYY-MM-DD"),
              planId: props.param,
              note: values.note,
              scope: Number(values.scope),
              duration: 9
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
            console.log(data)
          }, (e) => {
            const errors = e.graphQLErrors.map(error => error.message)
            props.setSubmitting(false)
            props.setErrors({ username: ' ', password: ' ', form: errors[0] })
         })
      }
  })
)(Bin);
