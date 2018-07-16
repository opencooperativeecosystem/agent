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
      <DatePicker
        selected={props.value}
        onChange={handleChange}
        dateFormat={"DD MMM"}
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
              {errors.numericValue && touched.numericValue && <Alert>{errors.numericValue}</Alert>}
              <h5 className={style.sentence_action}>{unit}</h5>
              <StartDate
                value={values.date}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.start}
                touched={touched.start}
              />
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
            {action === 'produce' || action === 'use' || action === 'consume'
             ? <div className={style.item_publishActions}>
                <button className={style.publishActions_button}><span><Icons.Plus width='16' height='16' color='#f0f0f0' /></span>Create a resource</button>
            </div> 
             : <div className={style.item_publishActions}>
             <Button>Publish</Button>
             <div className={style.item_distribution}>
               <Field
                 name="requestPayment"
                 render={({ field /* _form */ }) => (
                   <ToggleButton
                     name={field.name}
                     value={field.value}
                     onToggle={(value) => setFieldValue('requestPayment', !value)}
                   />
                 )}
               />
               <label>Request payment</label>
             </div>
            </div> 
            }
          </div>
        </div>
      </div>
    </Form>
  );
}
