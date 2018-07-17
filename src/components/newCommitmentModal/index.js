import React from "react";
import {
  SupTitle,
  Wrapper,
  Input,
  Textarea,
  Button,
  Select,
  Icons
} from "oce-components/build";
import { graphql } from "react-apollo";
import { compose, withState, withHandlers } from "recompose";
import moment from "moment";
import getResourcesQuery from "../../queries/getResources";
import getUnitsQuery from "../../queries/getUnits";
import DatePicker from "react-datepicker";
import style from "./style.css";
import Plan from "../../queries/getPlan";
import CreateCommitment from "../../mutations/CreateCommitment";
import { Form, withFormik, Field } from "formik";
import * as Yup from "yup";
import updateNotification from "../../mutations/updateNotification";
import deleteNotification from "../../mutations/deleteNotification";
import Alert from "../alert";
import "react-toastify/dist/ReactToastify.css";
import getResourceClassification from "../../queries/getResourceClassification";
require("react-datepicker/dist/react-datepicker-cssmodules.css");

const events = [
  "Accept",
  "Cite",
  "Consume",
  "Give",
  "Improve",
  "Produce",
  "Take",
  "Use",
  "Work"
];
let options = events.map((ev, i) => (
  <option key={i} value={ev}>
    {ev}
  </option>
));
options.unshift(
  <option defaultValue="" key={"383737ehshdh"}>
    Select your event
  </option>
);

const NewCommModal = ({
  handleEvent,
  handleResource,
  setFieldValue,
  setFieldTouched,
  setSubmitting,
  errors,
  touched,
  values,
  client,
  resources,
  units
}) => {
  let resourcesOptions = resources.map((ev, i) => {
    return (
      <option key={i} value={ev.id}>
        {ev.name}
      </option>
    );
  });
  resourcesOptions.unshift(
    <option defaultValue="" key={"383737ehshdh"}>
      Resource
    </option>
  );
  let unitsOptions = units.map((ev, i) => (
    <option key={i} value={ev.id}>
      {ev.name}
    </option>
  ));
  
  unitsOptions.unshift(
    <option defaultValue="" key={"383737ehshdh"}>
      Units
    </option>
  );

  if (units.length == 0) {
    unitsOptions.unshift(
      <option key={"1010010"}>
        Units
      </option>
    );
  }
  
  return (
    <Form>
      <div style={{ padding: "16px", paddingBottom: 0 }}>
        <h1 className={style.commTitle}>Create a new commitment</h1>
        <div className={style.commitmentWrapper}>
          <div className={style.commInput}>
            <EventSelect
              value={values.event}
              onChange={setFieldValue}
              error={errors.event}
              touched={touched.event}
              handleEvent={handleEvent}
              options={options}
              client={client}
            />
          </div>
          <div className={style.commInput}>
            <ResourceSelect
              value={values.resource}
              onChange={setFieldValue}
              error={errors.resource}
              touched={touched.resource}
              options={resourcesOptions}
              client={client}
              handleResource={handleResource}
            />
          </div>
          <div className={style.commInput}>
            <Field
              name="qty"
              render={({ field /* _form */ }) => (
                <Input
                  className={style.qtyInput}
                  name={field.name}
                  onChange={field.onChange}
                  placeholder="00.00"
                />
              )}
            />
            {errors.qty && touched.qty && <Alert>{errors.qty}</Alert>}
          </div>
          <div className={style.commInput}>
            <Field
              name="unit"
              render={({ field /* _form */ }) => (
                <Select name={field.name} onChange={field.onChange}>
                  {unitsOptions.map(opt => opt)}
                </Select>
              )}
            />
            {errors.unit && touched.unit && <Alert>{errors.unit}</Alert>}
          </div>
        </div>
        <div
          className={style.textareaWrapper}
          style={{ height: "150px", marginTop: "0px", marginBottom: "0px" }}
        >
          <Field
            name="note"
            render={({ field /* _form */ }) => (
              <Textarea
                className={style.textarea}
                name={field.name}
                onChange={field.onChange}
                placeholder="Write some note"
              />
            )}
          />
        </div>
        <div className={style.footer}>
          <StartDate
            value={values.date}
            onChange={setFieldValue}
            onBlur={setFieldTouched}
            error={errors.start}
            touched={touched.start}
          />
          <Button>Publish</Button>
        </div>
      </div>
    </Form>
  );
};

const EventSelect = props => {
  const handleChange = value => {
    props.onChange("event", value.target.value);
    props.handleEvent(props.client, value);
  };
  return (
    <div>
      <Select name={"event"} onChange={handleChange}>
        {props.options.map(opt => opt)}
      </Select>
      {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  );
};

const ResourceSelect = props => {
  const handleChange = value => {
    props.onChange("resource", value.target.value);
    props.handleResource(props.client, value);
  };
  return (
    <div>
      <Select name={"resource"} onChange={handleChange}>
        {props.options.map(opt => opt)}
      </Select>
      {props.error &&
        props.touched && <Alert>{props.error}</Alert>}
    </div>
  );
};

const StartDate = props => {
  const handleChange = value => {
    props.onChange("date", value);
  };
  return (
    <div className={style.dateWrapper}>
      <h5 className={style.dateName}>
        <span style={{ verticalAlign: "sub", marginRight: "5px" }}>
          <Icons.Calendar width="16" height="16" color="#707BA0" />
        </span>
        Due
      </h5>
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

export default compose(
  withState("resources", "onResourcesArray", []),
  withState("units", "onUnitsArray", []),
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  withFormik({
    mapPropsToValues: (props) => ({
      event: "",
      note: "",
      resource: "",
      qty: "",
      unit: "",
      date: moment()
    }),
    validationSchema: Yup.object().shape({
      event: Yup.string().required(),
      note: Yup.string(),
      resource: Yup.string().required(),
      qty: Yup.number().required(),
      unit: Yup.string().required(),
      date: Yup.string()
    }),
    handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
      let date = moment(values.date).format("YYYY-MM-DD");
      setSubmitting(true);
      return props.client
        .mutate({
          mutation: CreateCommitment,
          variables: {
            token: localStorage.getItem("oce_token"),
            action: values.event.toLowerCase(),
            due: date,
            note: values.note,
            committedResourceClassifiedAsId: values.resource,
            committedUnitId: values.unit,
            committedNumericValue: values.qty,
            inputOfId: props.processId,
            outputOfId: props.processId,
            planId: props.planId,
            scopeId: props.scopeId
          },
          update: (cache, { data: { createCommitment } }) => {
            const data = cache.readQuery({
              query: Plan,
              variables: {
                token: localStorage.getItem("oce_token"),
                planId: Number(props.planId)
              }
            });
            const processIndex = data.viewer.plan.planProcesses.findIndex(
              process => Number(process.id) === Number(props.processId)
            );
            if (createCommitment.commitment.action === "work") {
              data.viewer.plan.planProcesses[processIndex].committedInputs.push(
                createCommitment.commitment
              );
            } else {
              data.viewer.plan.planProcesses[
                processIndex
              ].committedOutputs.push(createCommitment.commitment);
            }
            cache.writeQuery({
              query: Plan,
              data,
              variables: {
                token: localStorage.getItem("oce_token"),
                planId: Number(props.match.params.id)
              }
            });
          }
        })
        .then(data => {
          props.toggleModal();
          props
            .updateNotification({
              variables: {
                message: (
                  <div style={{ fontSize: "14px" }}>
                    <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                      <Icons.Bell width="18" height="18" color="white" />
                    </span>Commitment created successfully!
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
        })
        .catch(e => {
          props.toggleModal();
          const errors = e.graphQLErrors.map(error => error.message);
          setSubmitting(false);
          props
            .updateNotification({
              variables: {
                message: (
                  <div style={{ fontSize: "14px" }}>
                    <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
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
        });
    }
  }),
  withHandlers({
    handleEvent: props => (client, ev) => {
      return client
        .query({
          query: getResourcesQuery,
          variables: {
            token: localStorage.getItem("oce_token"),
            action: ev.target.value.toUpperCase()
          }
        })
        .then(res => {
          client.writeData({
            data: {
              activeResources: res.data.viewer.resourceClassificationsByAction
            }
          });
          props.onResourcesArray([]);
          props.onResourcesArray(res.data.viewer.resourceClassificationsByAction || []);
          props.onUnitsArray([])
        })
        .catch(e => console.log(e));
    },
    handleResource: props => (client, ev) => {
      return client
        .query({
          query: getResourceClassification,
          variables: {
            token: localStorage.getItem("oce_token"),
            id: ev.target.value
          }
        })
        .then(res => {
          console.log(res)
          let arr = []
          if (res.data.viewer.resourceClassification.unit.id === "2"){
            arr.push(res.data.viewer.resourceClassification.unit)
          }
          else {
            arr.push(res.data.viewer.resourceClassification.unit)
            arr.push({id: "2", name: 'Hour'})
          }
          props.onUnitsArray(arr || []);
        })
        .catch(e => console.log(e));
    }
  })
)(NewCommModal);
