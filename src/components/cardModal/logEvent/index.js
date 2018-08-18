import { compose } from "recompose";
import Component from "./logEvent";
import { graphql } from "react-apollo";
import moment from "moment";
import React from "react";
import { Icons } from "oce-components/build";
import deleteNotification from "../../../mutations/deleteNotification";
import queryEvents from "../../../queries/getEvents";
import commitment from "../../../queries/getCommitment";
import createEvent from "../../../mutations/createEvent";
import { withFormik } from "formik";
import * as Yup from "yup";
import updateNotification from "../../../mutations/updateNotification";

const wrapperComponent = compose(
  graphql(createEvent, { name: "createEventMutation" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  graphql(updateNotification, { name: "updateNotification" }),
  withFormik({
    mapPropsToValues: props => ({
      action: props.action,
      note: "",
      numericValue: "00.00",
      unit: 2,
      requestPayment: props.action === 'produce' ? false : true,
      url: '',
      date: moment(),
      affectedResourceClassifiedAsId: props.resourceId,
      resourceCurrentLocationId: null,
      resourceTrackingIdentifier: '',
      createResource: props.action === 'produce' ? true : false
    }),
    validationSchema: Yup.object().shape({
      note: Yup.string(),
      numericValue: Yup.string().required(),
      unit: Yup.number(),
      requestPayment: Yup.boolean(),
      date: Yup.string(),
      url: Yup.string()
    }),
    handleSubmit: (values, { props, resetForm, setErrors, setSubmitting }) => {
      let date = moment(values.date).format("YYYY-MM-DD");
      let unit = props.units.filter(u => u.name === props.unit).map(u => u.id);      
        let eventMutationVariables = {
          token: localStorage.getItem("oce_token"),
          id: props.id,
          providerId: props.agentId,
          receiverId: props.scopeId,
          action: props.action,
          scopeId: props.scopeId,
          requestDistribution: values.requestPayment,
          commitmentId: props.commitmentId,
          note: values.note,
          affectedNumericValue: values.numericValue,
          affectedUnitId: unit[0],
          start: date,
          resourceUrl: values.url,
          affectedResourceClassifiedAsId: values.affectedResourceClassifiedAsId,
          resourceCurrentLocationId: values.resourceCurrentLocationId,
          resourceTrackingIdentifier: values.resourceTrackingIdentifier,
          createResource: values.createResource
        }
      return props
        .createEventMutation({
          variables: eventMutationVariables,
          update: (store, { data }) => {
            let EventsCache = store.readQuery({
              query: queryEvents,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: Number(props.commitmentId)
              }
            });
            let CommitmentCache = store.readQuery({
              query: commitment,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: Number(props.commitmentId)
              }
            });
            // Add the last economicevent to the events list cache, related to its commitment
            EventsCache.viewer.commitment.fulfilledBy.unshift({
              fulfilledBy: {
                action: data.createEconomicEvent.economicEvent.action,
                requestDistribution:
                  data.createEconomicEvent.economicEvent.requestDistribution,
                scope: {
                  id: data.createEconomicEvent.economicEvent.scope.id,
                  __typename: "Organization"
                },
                start: data.createEconomicEvent.economicEvent.start,
                id: data.createEconomicEvent.economicEvent.id,
                note: data.createEconomicEvent.economicEvent.note,
                provider: data.createEconomicEvent.economicEvent.provider,
                url: data.createEconomicEvent.economicEvent.url,
                affects:  {
                  trackingIdentifier: data.createEconomicEvent.economicEvent.affects.trackingIdentifier,
                  resourceClassifiedAs: {
                    id: data.createEconomicEvent.economicEvent.affects.resourceClassifiedAs.id,
                    name:data.createEconomicEvent.economicEvent.affects.resourceClassifiedAs.name,
                    __typename: "ResourceClassification"
                  },
                  note: data.createEconomicEvent.economicEvent.affects.note,
                  __typename:"EconomicResource"
                },
                __typename: "EconomicEvent"
              },
              fulfilledQuantity: {
                numericValue:
                  data.createEconomicEvent.economicEvent.affectedQuantity
                    .numericValue,
                unit: {
                  id: data.createEconomicEvent.economicEvent.affectedQuantity.unit
                  .id, 
                  name:
                    data.createEconomicEvent.economicEvent.affectedQuantity.unit
                      .name,
                  __typename: "Unit"
                },
                __typename: "QuantityValue"
              },
              __typename: "Fulfillment"
            });
            // Add a new working agent into the plan cache, if it is not already there
            const agentindex = CommitmentCache.viewer.commitment.involvedAgents.findIndex(
              agent =>
                agent.id === data.createEconomicEvent.economicEvent.provider.id
            );
            if (agentindex === -1) {
              CommitmentCache.viewer.commitment.involvedAgents.push({
                id: data.createEconomicEvent.economicEvent.provider.id,
                image: data.createEconomicEvent.economicEvent.provider.image,
                name: data.createEconomicEvent.economicEvent.provider.name,
                __typename: "Person"
              });
            }
            // Write in the cache the updated events list
            store.writeQuery({
              query: queryEvents,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: props.commitmentId
              },
              data: EventsCache
            });
            // Write in the cache the updated commitment
            store.writeQuery({
              query: commitment,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: props.commitmentId
              },
              data: CommitmentCache
            });
          }
        })
        .then(data => {
          return (
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
          )
        } 
        )
        .catch(e => {
          const errors = e.graphQLErrors.map(error => error.message);
          console.log(errors)
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

export default wrapperComponent;
