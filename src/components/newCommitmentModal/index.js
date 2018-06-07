import React from "react";
import { NewCommitmentModal } from "oce-components/build";
import { compose, withState, withHandlers } from "recompose";
import moment from "moment";
import { graphql, withApollo, ApolloConsumer } from "react-apollo";
import getResourcesQuery from "../../queries/getResources";
import getUnitsQuery from "../../queries/getUnits";
import DatePicker from "react-datepicker";
import style from './style.css'
import Plan from "../../queries/getPlan";
import CreateCommitment from '../../mutations/CreateCommitment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

const Modal = ({
  createCommitment,
  units,
  date,
  resources,
  handleNote,
  handleDate,
  match,
  scopeId,
  planId,
  processId,
  handleEvent,
  handleQty,
  handleResource,
  handleUnit
}) => {
  let resourcesOptions = resources.map((ev, i) => (
    <option key={i} value={ev.id}>
      {ev.name}
    </option>
  ));
  resourcesOptions.unshift(
    <option defaultValue="" key={"383737ehshdh"}>
      Select your resource
    </option>
  );
  let unitsOptions = units.map((ev, i) => (
    <option key={i} value={ev.id}>
      {ev.name}
    </option>
  ));
  unitsOptions.unshift(
    <option defaultValue="" key={"383737ehshdh"}>
      Select your units
    </option>
  );
  return (
    <ApolloConsumer>
      {client => (
        <NewCommitmentModal
          createCommitment={() => createCommitment(client, planId, processId, match, scopeId)}
          events={options}
          units={unitsOptions}
          resources={resourcesOptions}
          handleEvent={ev => handleEvent(client, ev)}
          handleResource={handleResource}
          handleQty={handleQty}
          handleUnit={handleUnit}
          handleDate={handleDate}
          dateComponent={
            <DatePicker
              selected={date}
              onChange={handleDate}
              dateFormatCalendar={"DD MMM YYYY"}
              className={style.dateComp}
              withPortal
            />}
          handleNote={handleNote}
        />
    )}
    <ToastContainer />
    </ApolloConsumer>
    // createCommitment={} resources={[]}
  );
};

export default compose(
  withState("event", "onEvent", null),
  withState("resource", "onResource", null),
  withState("qty", "onQty", null),
  withState("unit", "onUnit", null),
  withState("note", "onNote", null),
  withState("date", "onDate", moment()),
  withState("resources", "onResourcesArray", []),
  withState("units", "onUnitsArray", []),
  withHandlers({
    handleEvent: props => (client, ev) => {
      props.onEvent(ev.target.value);
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
          props.onResourcesArray(
            res.data.viewer.resourceClassificationsByAction || []
          );
          client.query({
            query: getUnitsQuery,
            variables: {
                token: localStorage.getItem("oce_token"),
            }
            })
            .then(res => {
                props.onUnitsArray(
                    res.data.viewer.allUnits || []
                )
            })
        })
        .catch(e => console.log(e));
    },
    handleResource: props => event => {
      props.onResource(event.target.value);
    },
    handleQty: props => event => {
      props.onQty(event.target.value);
    },
    handleUnit: props => event => {
      props.onUnit(event.target.value);
    },
    handleDate: props => event => {
      props.onDate(event);
    },
    handleNote: props => event => {
      props.onNote(event.target.value);
    },
    createCommitment: props => (client, planId, processId, match, scopeId) => {
      let date = moment(props.date).format("YYYY-MM-DD")
      return client.mutate({
          mutation: CreateCommitment,
          variables: {
              token: localStorage.getItem("oce_token"),
              action: props.event.toLowerCase(),
              due: date,
              note: props.note,
              committedResourceClassifiedAsId: props.resource,
              committedUnitId: props.unit,
              committedNumericValue: props.qty,
              inputOfId: processId,
              outputOfId: processId,
              planId: planId,
              scopeId: scopeId
          },
          update: (cache, {data: {createCommitment}}) => {
            const data = cache.readQuery({query: Plan, variables: {
              token: localStorage.getItem('oce_token'),
              planId: Number(planId)
          }})
          const processIndex = data.viewer.plan.planProcesses.findIndex(process => Number(process.id) === Number(props.processId))
          if (createCommitment.commitment.action === 'work') {
              data.viewer.plan.planProcesses[processIndex].committedInputs.push(createCommitment.commitment)
            } else {
                data.viewer.plan.planProcesses[processIndex].committedOutputs.push(createCommitment.commitment)
          }
            cache.writeQuery({
                query: Plan,
                data,
                variables: {
                  token: localStorage.getItem("oce_token"),
                  planId: Number(match.params.id)
                }
            })
        }
      })
      .then(res => () => toast("Wow so easy !"))
      .catch(e => () => toast("error !"))
    }
  })
)(Modal);
