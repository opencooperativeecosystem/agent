import React from "react";
import style from "./style.css";
import { Icons, Input, Textarea, Button } from "oce-components/build";
import DatePicker from "react-datepicker";
import { Form, Field } from "formik";
import Alert from "../alert";
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
      <span onClick={() => props.togglePopup('')}>
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

export default CreatePlan;
