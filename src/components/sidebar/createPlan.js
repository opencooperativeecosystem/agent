import React from "react";
import style from "./style.css";
import { Icons, Input, Textarea, Button } from "oce-components/build";
import DatePicker from "react-datepicker";
import { Form, Field } from "formik";
import Alert from "../alert";
import createPlan from "../../mutations/CreatePlan";
import updateNotification from "../../mutations/updateNotification";
import deleteNotification from "../../mutations/deleteNotification";
import { graphql } from "react-apollo";
import moment from "moment";
import { withFormik } from "formik";
import * as Yup from "yup";
import { compose } from "recompose";
require("react-datepicker/dist/react-datepicker-cssmodules.css");

const DueDate = props => {
  const handleChange = value => {
    props.onChange("due", value);
  };
  return (
    <div>
      <DatePicker
        selected={props.value}
        onChange={handleChange}
        dateFormat={"DD MMM YYYY"}
        withPortal
      />
      {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  );
};

const CreatePlan = props => (
  <div className={style.section_planCreation}>
    <div className={style.planCreation_info}>
      <h4 className={style.planCreation_title}>Create a new plan</h4>
      <span onClick={() => props.togglePopup("")}>
        <Icons.Cross width="18" height="18" color="#f0f0f0" />
      </span>
    </div>
    <Form className={style.planCreation_wrapper}>
      <div className={style.form_input}>
        <Field
          name="name"
          render={({ field }) => (
            <Input {...field} placeholder="Type the plan name" />
          )}
        />
        {props.errors.name &&
          props.touched.name && <Alert>{props.errors.name}</Alert>}
      </div>
      <div className={style.formPlanWrapper}>
        <div className={style.form_note}>
          <Field
            name="note"
            render={({ field }) => (
              <Textarea {...field} placeholder="What is the plan about" />
            )}
          />
        </div>
        <div className={style.dates}>
          <div className={style.dateWrapper}>
            <h5 className={style.dateName}>
              <span style={{ verticalAlign: "sub" }}>
                <Icons.Calendar width="16" height="16" color="#707BA0" />
              </span>{" "}
              Due
            </h5>
            <DueDate
              value={props.values.due}
              onChange={props.setFieldValue}
              onBlur={props.setFieldTouched}
              error={props.errors.due}
              touched={props.touched.due}
            />
          </div>
          <div className={style.form_button}>
            <Button>Create</Button>
          </div>
        </div>
      </div>
    </Form>
  </div>
);

export default compose(
  graphql(createPlan, { name: "createPlanMutation" }),
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  withFormik({
    mapPropsToValues: props => ({
      name: "",
      note: "",
      start: moment(),
      due: moment()
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      note: Yup.string(),
      start: Yup.string().required(),
      due: Yup.string().required()
    }),
    handleSubmit: (values, { props }) => {
      let date = moment(values.due).format("YYYY-MM-DD");
      props
        .createPlanMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            name: values.name,
            due: date,
            note: values.note
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
                      </span>Plan {data.data.createPlan.plan.name} created
                      successfully!
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
            return props.history.push(
              `/canvas/${data.data.createPlan.plan.id}`
            );
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
            props.setSubmitting(false);
          }
        );
    }
  })
)(CreatePlan);
