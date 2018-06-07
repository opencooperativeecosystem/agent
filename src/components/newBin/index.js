import React from "react";
import { Mutation } from "react-apollo";
import { NewBin } from "oce-components/build";
import CreateProcess from "../../mutations/createProcess";
import { compose, withState, withHandlers } from "recompose";
import moment from "moment";
import Plan from "../../queries/getPlan";
import DatePicker from "react-datepicker";
require("react-datepicker/dist/react-datepicker-cssmodules.css");

const Bin = ({
  name,
  note,
  scope,
  start,
  handleName,
  param,
  handleNote,
  handleScope,
  handleDate,
  relationships,
  clicked,
  toggleClicked
}) => {
  return (
    <Mutation 
      mutation={CreateProcess}
      variables={{
        token: localStorage.getItem('oce_token'),
        name: name,
        planned: moment(start).format("YYYY-MM-DD"),
        planId: param,
        note: note,
        scope: Number(scope),
        duration: 9
      }}
      update={(cache, {data: {createProcess}}) => {
          const data = cache.readQuery({query: Plan, variables: {
              token: localStorage.getItem('oce_token'),
              planId: Number(param)
            }})
          data.viewer.plan.planProcesses.push(createProcess.process)
          cache.writeQuery({
              query: Plan,
              data,
              variables: {
                token: localStorage.getItem("oce_token"),
                planId: Number(param)
              }
          })
      }}
    >
      {(createProcess, { loading, error, data }) => (
        <span><NewBin
          clicked={clicked}
          toggleClicked={toggleClicked}
          options={relationships}
          newName={handleName}
          newNote={handleNote}
          newScope={handleScope}
          newProcess={createProcess}
          dateComponent={
            <DatePicker
              selected={start}
              onChange={handleDate}
              dateFormatCalendar={"DD MMM YYYY"}
              className="dateClass"
              withPortal
            />
          }
        />
        {loading && <p>Loading...</p>}
        {error && <p>Error :( Please try again</p>}
        </span>
      )}
    </Mutation>
  );
};

export default compose(
  withState("name", "handleNameNewProcess", ""),
  withState("note", "handleNoteNewProcess", ""),
  withState("scope", "handleScopeNewProcess", null),
  withState("start", "handleStartNewProcess", moment()),
  withState("clicked", "handleClicked", false),
  withHandlers({
    toggleClicked: props => () => {
      props.handleClicked(!props.clicked);
    },
    handleName: props => event => {
      props.handleNameNewProcess(event.target.value);
    },
    handleNote: props => event => {
      props.handleNoteNewProcess(event.target.value);
    },
    handleScope: props => event => {
      props.handleScopeNewProcess(event.target.value);
    },
    handleDate: props => event => {
      props.handleStartNewProcess(event);
    }
  })
)(Bin);
