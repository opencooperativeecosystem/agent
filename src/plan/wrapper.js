import { compose, withHandlers, withState } from "recompose";
import Component from "./index";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import moment from "moment";

const createPlan = gql`
  mutation($token: String!, $name: String!, $due: String!, $note: String) {
    createPlan(token: $token, name: $name, due: $due, note: $note) {
      plan {
        id
        name
        due
        note
      }
    }
  }
`;

export default compose(
  graphql(createPlan, { name: "createPlanMutation" }),
  withState("name", "handleName", ""),
  withState("note", "handleNote", ""),
  withState("start", "handleStart", moment()),
  withState("due", "handleDue", moment()),
  withHandlers({
    updateNote: props => event => {
      console.log(event.target.value);
      props.handleNote(event.target.value);
    },
    updateName: props => event => {
      console.log(event.target.value);
      props.handleName(event.target.value);
    },
    updateStart: props => event => {
      props.handleStart(event);
    },
    updateDue: props => event => {
      props.handleDue(event);
    },
    createPlan: props => event => {
      console.log(props);
      let date = moment(props.due).format("YYYY-MM-DD");
      props
        .createPlanMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            name: props.name,
            due: date,
            note: props.note
          }
        })
        .then(data => {
          return props.history.push(`canvas/${data.data.createPlan.plan.id}`);
        })
        .catch(e => console.log(e));
    }
  })
)(Component);
