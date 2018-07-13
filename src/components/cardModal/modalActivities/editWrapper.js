import { withFormik } from "formik";
import * as Yup from "yup";
import updateNotification from "../../../mutations/updateNotification";
import { Icons } from "oce-components/build";
import React from "react";
import deleteNotification from "../../../mutations/deleteNotification";
import moment from "moment";
import updateEvent from "../../../mutations/updateEvent";
import Component from "../logEvent/logEvent";
import { compose } from "recompose";
import { graphql } from "react-apollo";

export default compose(
  graphql(updateEvent, { name: "updateEventMutation" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  graphql(updateNotification, { name: "updateNotification" }),
  withFormik({
    mapPropsToValues: props => ({
      action: props.action,
      note: props.note,
      numericValue: props.unitValue,
      unit: props.unit,
      requestPayment: props.requestPayment,
      date: moment(props.date)
    }),
    validationSchema: Yup.object().shape({
      note: Yup.string(),
      numericValue: Yup.string(),
      requestPayment: Yup.boolean(),
      date: Yup.string()
    }),
    handleSubmit: (values, { props }) => {
      let date = moment(values.date).format("YYYY-MM-DD");
      return props
        .updateEventMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            id: props.idEventToEdit,
            action: values.action,
            scopeId: props.scopeId,
            requestDistribution: values.requestPayment,
            commitmentId: props.commitmentId,
            note: values.note,
            affectedNumericValue: values.numericValue,
            affectedUnitId: props.unitId,
            start: date
          },
        })
        .then(data =>{
            props.toggleEditEvent(props.editEventModal, props.idEventToEdit)
            props
              .updateNotification({
                variables: {
                  message: (
                    <div style={{ fontSize: "14px" }}>
                      <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                        <Icons.Bell width="18" height="18" color="white" />
                      </span>Event logged successfully!
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
              })
          })
          .catch(e => {
            props.toggleEditEvent(props.editEventModal, props.idEventToEdit)
            const errors = e.graphQLErrors.map(error => error.message);
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
  })
)(Component);
