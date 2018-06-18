import React from 'react'
import style from './style.css'
import {Textarea, Button} from 'oce-components/build'
import {Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import Alert from '../alert'

const EditNote = (props) => (
  <Form>
    <span className={style.form_note}>
      <Field name="note" render={({ field /* _form */ }) => (<Textarea {...field} placeholder='Type the process note...' />)} />
      {props.errors.note && props.touched.note && <Alert>{props.errors.note}</Alert>}
    </span>
    <Button>Update note</Button>
  </Form>
)

export default withFormik({
  mapPropsToValues: (props) => ({ note: '' }),
  validationSchema: Yup.object().shape({
     note: Yup.string().required()
  }),
  handleSubmit: (values, {props, resetForm, setErrors, setSubmitting}) => {
    console.log('eccolo')
  }
})(EditNote);
