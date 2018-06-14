import React from 'react'
import {Panel, Icons, Input, Select, Textarea, Button} from 'oce-components/build'
import AgentRelationships from '../agentRelationships'
import style from './style.css'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import {withFormik, Form, Field} from 'formik'
import * as Yup from 'yup'
import Alert from '../components/alert'
require("react-datepicker/dist/react-datepicker-cssmodules.css")

// ROUTES
const Plan = (props) => {
  return (
    <div className={style.container}>
      <Panel icon={<Icons.Globe width='18' color='#f0f0f0' />} title='Create new plan'>
        <div className={style.panel_container}>
        <Form>
          <span className={style.form_input}>
            <Field name="name" render={({ field /* _form */ }) => (<Input dark {...field} placeholder='Type the plan name' />)} />
            {props.errors.name && props.touched.name && <Alert>{props.errors.name}</Alert>}
          </span>
          <span className={style.form_note}>
            <Field name="note" render={({ field /* _form */ }) => (<Textarea {...field} placeholder='What is the plan about' />)} />
          </span>
          <div className={style.dates}>
            <div className={style.item_date}>
              <h5>Start date</h5>
              <StartDate
                value={props.values.start}
                onChange={props.setFieldValue}
                onBlur={props.setFieldTouched}
                error={props.errors.start}
                touched={props.touched.start}
              />
            </div>
            <div className={style.item_date}>
              <h5>Due date</h5>
              <DueDate
                value={props.values.due}
                onChange={props.setFieldValue}
                onBlur={props.setFieldTouched}
                error={props.errors.due}
                touched={props.touched.due}
              />
            </div>
          </div>
          <div className={style.form_button}>
            <Button>Create</Button>
          </div>
          </Form>
        </div>
      </Panel>
      <AgentRelationships match={props.match} relationships={props.relationships} />
    </div>
  )
}


const StartDate = (props) => {
  const handleChange = value => {
    props.onChange('start', value);
  };
  return (
    <div>
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

const DueDate = (props) => {
  const handleChange = value => {
    props.onChange('due', value);
  };
  return (
    <div>
    <DatePicker
      selected={props.value}
      onChange={handleChange}
      dateFormatCalendar={'DD MMM YYYY'}
    />
    {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  )
}

export default Plan

