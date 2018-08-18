import React from "react";
import style from "../index.css";
import { Button, Input, Textarea, Icons } from "oce-components/build";
import DatePicker from "react-datepicker";
import ToggleButton from "react-toggle-button";
import { Form, Field } from "formik";
import Alert from "../../alert";
require("react-datepicker/dist/react-datepicker-cssmodules.css");

const StartDate = props => {
  const handleChange = value => {
    props.onChange("date", value);
  };
  return (
    <div className={style.item_date}>
      <span>
        <Icons.Calendar width="18" height="18" color="#3B99FC" />
      </span>
      <DatePicker
        selected={props.value}
        onChange={handleChange}
        dateFormat={"DD MMM"}
        withPortal
      />
      {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  );
};

export default function LogEvent({
  action,
  values,
  setFieldValue,
  errors,
  touched,
  setFieldTouched,
  unit,
  units,
  resource,
  resourceId
}) {

  return (
    <Form>
      <div className={style.content_module}>
        <div className={style.content_log}>
          <div className={style.log_item}>
            <div className={style.item_sencence}>
              <h5 className={style.sentence_action}>{action}</h5>
              <Field
                name="numericValue"
                render={({ field /* _form */ }) => (
                  <Input
                    value={field.value}
                    name={field.name}
                    onChange={field.onChange}
                    className={style.action_input_amount}
                    type="number"
                    min="00.00"
                    max="100.00"
                    step="0.1"
                    placeholder="00.00"
                  />
                )}
              />
              {errors.numericValue &&
                touched.numericValue && <Alert>{errors.numericValue}</Alert>}
              <h5 className={style.sentence_action}>{unit}</h5>
              <span className={style.of}>of</span>
              <h5 className={style.sentence_action}>{resource}</h5>
            </div>
            <Field
              name="note"
              render={({ field /* _form */ }) => (
                <Textarea
                  value={field.value}
                  name={field.name}
                  onChange={field.onChange}
                  placeholder={"Add a more detailed description..."}
                />
              )}
            />
            {action === "produce" ||
            action === "use" ||
            action === "consume" ? (
              <div>
                <div className={style.item_publishResourceName}>
                  <span>
                    <Icons.Edit width="16" height="16" color="#525561" />
                  </span>
                  <Field
                    name="resourceTrackingIdentifier"
                    render={({ field /* _form */ }) => (
                      <Input
                        value={field.value}
                        name={field.name}
                        onChange={field.onChange}
                        placeholder="Type an identify name for the resource..."
                      />
                    )}
                  />
                </div>

                <div className={style.item_extLink}>
                  <span>
                    <Icons.Link width="16" height="16" color="#525561" />
                  </span>
                  <Field
                    name="url"
                    render={({ field /* _form */ }) => (
                      <Input
                        value={field.value}
                        name={field.name}
                        onChange={field.onChange}
                        placeholder="Type an optional external url for the resource ..."
                      />
                    )}
                  />
                </div>
              </div>
             ) : null}
            <div className={style.item_publishActions}>
              <StartDate
                value={values.date}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.start}
                touched={touched.start}
              />
              <Button className={style.publish_button}>Publish</Button>
              {action === "produce" ||
              action === "use" ||
              action === "consume" ? null : (
                <div className={style.item_distribution}>
                  <Field
                    name="requestPayment"
                    render={({ field /* _form */ }) => (
                      <ToggleButton
                        name={field.name}
                        value={field.value}
                        onToggle={value =>
                          setFieldValue("requestPayment", !value)
                        }
                      />
                    )}
                  />
                  <label>Request payment</label>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
}
