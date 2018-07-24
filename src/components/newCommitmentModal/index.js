import React from "react";
import {
  SupTitle,
  Wrapper,
  Input,
  Textarea,
  Button,
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
import getResourceClassification from "../../queries/getResourceClassification";
import Select from "react-select";
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
let options = events.map((ev, i) => ({
  value: ev,
  label: ev
}));

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
    return {
      value: ev.id,
      label: ev.name
    };
  });

  let unitsOptions = units.map((ev, i) => ({
    value: ev.id,
    label: ev.name
  }));

  return (
    <Form>
      <div style={{ padding: "16px", paddingBottom: 0 }}>
        <h1 className={style.commTitle}>Create a new commitment</h1>
        <div className={style.commitmentWrapper}>
          <div className={style.commInput + ' ' + style.event }>
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
          <div className={style.commInput + ' ' + style.resource}>
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
          <div className={style.commInput + ' ' +  style.qtyInput}>
            <Field
              name="qty"
              render={({ field /* _form */ }) => (
                <Input
                  name={field.name}
                  onChange={field.onChange}
                  placeholder="00.00"
                  type="number"
                  step="0.1"
                />
              )}
            />
            {errors.qty && touched.qty && <Alert>{errors.qty}</Alert>}
          </div>
          <div className={style.commInput + ' ' + style.unit}>
            <Field
              name="unit"
              render={({ field /* _form */ }) => (
                <Select isDisabled={unitsOptions.length === 0} name={field.name} placeholder='Unit...' options={unitsOptions} onChange={(value) => setFieldValue('unit', value.value)} />
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
    props.onChange("event", value.value);
    props.handleEvent(props.client, value.value);
  };
  return (
    <div>
      <Select name={"event"} placeholder='Events' options={options} onChange={handleChange} />
      {props.error && props.touched && <Alert>{props.error}</Alert>}
    </div>
  );
};

const ResourceSelect = props => {
  const handleChange = value => {
    props.onChange("resource", value.value);
    props.handleResource(props.client, value.value);
  };
  return (
    <div>
      <Select
        name={"resource"}
        isDisabled={props.options.length === 0}
        options={props.options}
        placeholder='Resources'
        onChange={handleChange}
      />
      {props.error && props.touched && <Alert>{props.error}</Alert>}
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
    mapPropsToValues: props => ({
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
              setSubmitting(false)
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
            action: ev.toUpperCase()
          }
        })
        .then(res => {
          client.writeData({
            data: {
              activeResources: res.data.viewer.resourceClassificationsByAction
            }
          });
          props.onResourcesArray([]);
          props.onResourcesArray(
            res.data.viewer.resourceClassificationsByAction || []
          );
          props.onUnitsArray([]);
        })
        .catch(e => console.log(e));
    },
    handleResource: props => (client, ev) => {
      return client
        .query({
          query: getResourceClassification,
          variables: {
            token: localStorage.getItem("oce_token"),
            id: ev
          }
        })
        .then(res => {
          let arr = [];
          if (res.data.viewer.resourceClassification.unit.id === "2") {
            arr.push(res.data.viewer.resourceClassification.unit);
          } else {
            arr.push(res.data.viewer.resourceClassification.unit);
            arr.push({ id: "2", name: "Hour" });
          }
          props.onUnitsArray(arr || []);
        })
        .catch(e => console.log(e));
    }
  })
)(NewCommModal);
