import React from "react";
import { compose, withHandlers } from "recompose";
import { graphql } from "react-apollo";
import UpdateProcess from "../../mutations/updateProcess";
import { Bin, Card, Icons } from "oce-components/build";
import EditTitle from "./editTitle";
import EditStart from "./editStart";
import EditDue from "./editDue";
import EditScope from "./editScope";
import EditNote from "./editNote";
import Archive from "./archive";
import moment from "moment";
import updateNotification from "../../mutations/updateNotification";
import deleteNotification from "../../mutations/deleteNotification";
import gql from "graphql-tag";
import style from "./style.css";
import {NavLink} from 'react-router-dom'

const BinWrapper = ({
  name,
  note,
  openCardController,
  scope,
  scopeId,
  relationships,
  planId,
  plannedStart,
  id,
  updateProcess,
  cards,
  outputs,
  inputs,
  out,
  status,
  plannedFinish,
  planDueDate,
  planStartDate,
  openModal
}) => {
  let newtipe = cards.reduce(function(r, a, i) {
    if (!i || r[r.length - 1][0].action !== a.action) {
      return r.concat([[a]]);
    }
    r[r.length - 1].push(a);
    return r;
  }, []);
  let newoutputs = outputs.reduce(function(r, a, i) {
    if (!i || r[r.length - 1][0].action !== a.action) {
      return r.concat([[a]]);
    }
    r[r.length - 1].push(a);
    return r;
  }, []);
  return (
    <Bin
      openCardController={openCardController}
      updateProcess={updateProcess}
      name={name}
      status={status}
      scope={<NavLink to={`/agent/${scopeId}`}>{scope}</NavLink>}
      infoNote={note}
      Scopeform={
        <EditScope
          relationships={relationships}
          id={id}
          scope={scopeId}
          planId={planId}
        />
      }
      Titleform={<EditTitle title={name} id={id} planId={planId} />}
      Noteform={<EditNote note={note} id={id} planId={planId} />}
      Startform={
        <EditStart
          planStart={planStartDate}
          planDue={planDueDate}
          id={id}
          planId={planId}
          start={plannedStart}
        />
      }
      Dueform={
        <EditDue
          planStart={planStartDate}
          planDue={planDueDate}
          id={id}
          planId={planId}
          due={plannedFinish}
        />
      }
      Archive={<Archive id={id} planId={planId} />}
      plannedStart={moment(plannedStart).format("DD MMM")}
      plannedFinish={moment(plannedFinish).format("DD MMM")}
      outputs={newoutputs}
      id={id}
      cardController={false}
    >
      <div>
        {newtipe.map((type, i) => (
          <div key={i}>
            <h4 className={style.inputTitle}>{type[0].action}</h4>
            <div>
              {type.map(card => {
                let duration = moment
                  .duration(moment(card.due).diff(moment()))
                  .asHours();
                return (
                  <Card
                    key={card.id}
                    id={card.id}
                    listId={id}
                    status={card.isFinished}
                    openCard={() => openModal(id, card.id)}
                    percentage={card.percentage}
                    title={card.title}
                    note={card.note}
                    deadline={duration < 0 ? 'expired' : duration < 48 ? 'soon' : ''}
                    due={moment(card.due).format("DD MMM")}
                    members={card.members}
                  />
                );
              })}
            </div>
          </div>
        ))}
        {newoutputs.map((type, i) => (
          type ?
          <div key={i + 100}>
            <h4 className={style.inputTitle}>{type[0].action}</h4>
            <div>
              {type.map(card => {
                let duration = moment
                .duration(moment(card.due).diff(moment()))
                .asHours();
                return (
                <Card
                  key={card.id}
                  id={card.id}
                  listId={id}
                  status={card.isFinished}
                  openCard={() => openModal(id, card.id)}
                  percentage={card.percentage}
                  title={card.title}
                  note={card.note}
                  deadline={duration < 0 ? 'expired' : duration < 48 ? 'soon' : ''}
                  due={moment(card.due).format("DD MMM")}
                  members={card.members}
                />
              )})}
             </div>
          </div>
        : null
      ))}
      </div>
    </Bin>
  );
};

const enhancedList = compose(
  graphql(UpdateProcess, { name: "updateProcessMutation" }),
  graphql(updateNotification, { name: "updateNotification" }),
  graphql(deleteNotification, { name: "deleteNotification" }),
  withHandlers({
    updateProcess: props => event => {
      return props
        .updateProcessMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            id: props.id,
            isFinished: !props.status
          },
          update: (store, { data }) => {
            store.writeFragment({
              id: data.updateProcess.process.id,
              fragment: gql`
                fragment myProcess on Process {
                  isFinished
                  __typename
                }
              `,
              data: {
                isFinished: data.updateProcess.process.isFinished,
                __typename: "Process"
              }
            });
            // let planProcessesCache = store.readQuery({query: Plan,
            //   variables: {
            //     token: localStorage.getItem('oce_token'),
            //     planId: Number(props.planId)
            //   }})

            // const processToUpdateIndex = planProcessesCache.viewer.plan.planProcesses.findIndex(proc => proc.id === data.updateProcess.process.id)
            // planProcessesCache.viewer.plan.planProcesses[processToUpdateIndex].isFinished = data.updateProcess.process.isFinished
            // store.writeQuery({ query: Plan,
            //   variables: {
            //     token: localStorage.getItem('oce_token'),
            //     planId: Number(props.planId)
            //   },
            //   data: planProcessesCache })
          }
        })
        .then(data =>
          props
            .updateNotification({
              variables: {
                message: (
                  <div style={{ fontSize: "14px" }}>
                    <span style={{ marginRight: "10px", verticalAlign: "sub" }}>
                      <Icons.Bell width="18" height="18" color="white" />
                    </span>Process updated successfully!
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

        .catch(e => {
          const errors = e.graphQLErrors.map(error => error.message);
          props.setSubmitting(false);
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
)(BinWrapper);

export default enhancedList;
