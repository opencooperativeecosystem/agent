import React from "react";
import style from "../index.css";
import { Button, Textarea, Icons, Tooltip } from "oce-components/build";
import { compose, withState, withHandlers } from "recompose";
import UpdateCommitmentStatus from "../../../mutations/updateCommitmentStatus";
import GetPlan from '../../../queries/getPlan'
import {graphql} from 'react-apollo'

const EditNote = () => (
  <div className={style.editWrapper}>
    <div className={style.editWrapperNote}>
      <Textarea placeholder="Type the note..." />
    </div>
    <Button>Update note</Button>
  </div>
);

const DeleteNote = () => (
  <div className={style.editWrapper}>
    <h4>Are you sure to delete the commitment?</h4>
    <Button primary>Delete commitment</Button>
  </div>
);

const Standard = () => <h1>null</h1>;
const Actions = props => {
  let content = "";
  let styled = "";
  let Children = Standard;
  if (props.content == "commitment") {
    content = "Edit commitment";
    styled = style.one;
  } else if (props.content == "note") {
    content = "Edit note";
    styled = style.two;
    Children = EditNote;
  } else if (props.content == "due") {
    content = "Edit due";
    styled = style.three;
  } else if (props.content == "delete") {
    content = "Delete the commitment";
    styled = style.four;
    Children = DeleteNote;
  }
  return (
    <div className={style.content_buttons}>
      {props.showTooltip ? (
        <div className={style.content_tooltip + " " + styled}>
          <Tooltip
            handleActionsPopup={() => props.onhandleShowTooltip(props.content)}
            title={content}
          >
            <Children />
          </Tooltip>
        </div>
      ) : null}
      <h2>Actions</h2>
      <div className={style.buttons_list}>
        <div className={style.list_single}>
          <Button gray onClick={() => props.onhandleShowTooltip("commitment")}>
            <span className={style.button_icon}>
              <Icons.Activity width="14" height="14" color="#4c4c4c" />
            </span>{" "}
            Edit commitment
          </Button>
        </div>
        <div className={style.list_single}>
          <Button gray onClick={() => props.onhandleShowTooltip("note")}>
            <span className={style.button_icon}>
              <Icons.Text width="14" height="14" color="#4c4c4c" />
            </span>{" "}
            Edit note
          </Button>
        </div>
        <div className={style.list_single}>
          <Button gray onClick={() => props.onhandleShowTooltip("due")}>
            <span className={style.button_icon}>
              <Icons.Activity width="14" height="14" color="#4c4c4c" />
            </span>{" "}
            Edit due date
          </Button>
        </div>
        <div className={style.list_single}>
          <Button gray onClick={() => props.updateCommitment(!props.data.isFinished)}>
            Set {props.data.isFinished ? "Incompleted" : "Completed"}
          </Button>
        </div>
        <div className={style.list_single}>
          <Button primary onClick={() => props.onhandleShowTooltip("delete")}>
            <span className={style.button_icon}>
              <Icons.Cross width="14" height="14" color="#fff" />
            </span>{" "}
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default compose(
  withState("showTooltip", "handleTooltip", false),
  withState("content", "handleContent", ""),
  graphql(UpdateCommitmentStatus, {
    props: ({ mutate, ownProps: { id } }) => ({
      updateCommitmentMutation: mutate
    })
  }),
  withHandlers({
    onhandleShowTooltip: props => content => {
      if (props.content === content) {
        return props.handleTooltip(!props.showTooltip);
      }
      props.handleContent(content);
      props.handleTooltip(true);
    },
    updateCommitment: ({ updateCommitmentMutation, id , planId, processId}) => status => {
      return updateCommitmentMutation({
        variables: {
          token: localStorage.getItem("oce_token"),
          id: id,
          isFinished: status
        },
        update: (store, { data }) => {
          let planCache = store.readQuery({
            query: GetPlan,
            variables: {
              token: localStorage.getItem("oce_token"),
              planId: Number(planId)
            }
          });
          console.log(planCache);
          console.log(data);
          console.log(processId)
        let processIndex = planCache.viewer.plan.planProcesses
        .findIndex(process => process.id == processId)
        console.log(processIndex)

        //   store.writeQuery({
        //     query: GetCommitment,
        //     variables: {
        //       token: localStorage.getItem("oce_token"),
        //       id: Number(id)
        //     },
        //     data: commitmentCache
        //   });
        }
      })
        .then(data => console.log("cancellados"))
        .catch(e => console.log(e));
    }
  })
)(Actions);
