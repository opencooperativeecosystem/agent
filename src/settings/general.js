import React from 'react'
import style from './style.css'
import {Input, Icons, Textarea, Button} from 'oce-components/build'
import {Form, Field, withFormik } from 'formik'
import * as Yup from 'yup'
import Alert from '../components/alert'
import { graphql, compose } from "react-apollo";
import updateNotification from "../mutations/updateNotification";
import deleteNotification from "../mutations/deleteNotification";


const General = ({errors, touched, image}) => (
    <div>
    <h2>General settings</h2>
    <Form>
    <div className={style.form_item}>
      <div className={style.item_photo} style={{backgroundImage: `url(${image})`}} />
    </div>
    <div className={style.form_item}>
      <h5>Name</h5>
        <Field name='name' render={({field}) => (
            <Input {...field} />
        )}/>
        {errors.name && touched.name && <Alert>{errors.name}</Alert>}
    </div>
    <div className={style.form_item}>
      <h5>Email</h5>
      <Field name='email' render={({field}) => (
            <Input {...field} />
        )}/>
        {errors.email && touched.email && <Alert>{errors.email}</Alert>}
    </div>
    <div className={style.form_item}>
      <h5>Bio</h5>
      <Field name='note' render={({field}) => (
          <Textarea {...field}/>
        )}/>
        {errors.note && touched.note && <Alert>{errors.note}</Alert>}
      
    </div>
    <div className={style.form_actions}>
      <Button>Save changes</Button>
    </div>
    </Form>
  </div>
)

export default compose(
    graphql(updateNotification, {name: 'updateNotification'}),
    graphql(deleteNotification, {name: 'deleteNotification'}),
    withFormik({
        mapPropsToValues: (props) => ({ name: props.name || '', email: props.email || '', note: props.note || '' }),
        validationSchema: Yup.object().shape({
           name: Yup.string(),
           email: Yup.string(),
           note: Yup.string()
        }),
        handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
        return props
            .mutateSettings({
            variables: {
                id: props.id,
                name: values.name,
                email: values.email,
                image: values.image,
                note: values.note,
                token: localStorage.getItem("oce_token")
            }
            })
            .then(data => {
                props.updateNotification({variables: {
                  message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>General settings updated successfully!</div>,
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
              })
        }
    })
)(General)