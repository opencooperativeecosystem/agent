import React from 'react'
import style from './style.css'
import {Input, Button} from 'oce-components/build'
import {Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import Alert from '../alert'

const EditTitle = (props) => (
  <Form>
    <span className={style.form_input}>
      <Field name="title" render={({ field /* _form */ }) => (<Input {...field} placeholder='Type the process title...' />)} />
      {props.errors.title && props.touched.title && <Alert>{props.errors.title}</Alert>}
    </span>
    <Button>Update Title</Button>
  </Form>
)

export default withFormik({
  mapPropsToValues: (props) => ({ title: '' }),
  validationSchema: Yup.object().shape({
     title: Yup.string().required()
  }),
  handleSubmit: (values, {props, resetForm, setErrors, setSubmitting}) => {
    console.log('eccolo')
  }
})(EditTitle);
