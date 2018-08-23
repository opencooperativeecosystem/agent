import React from "react";
import Component from "./index";
import { graphql, withApollo } from "react-apollo";
import Claim from "../queries/getClaims";
import createValidation from "../mutations/createValidation";
import deleteValidation from "../mutations/deleteValidation";
import { compose, withHandlers, withState, lifecycle } from "recompose";
import gql from "graphql-tag";
import style from "./style.css";
import Header from "./header";
import ContributionModal from "../components/contributionModal/wrapper";
import { Select, Icons, Button, Panel } from "oce-components/build";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
// import Alert from "../alert";
{
  /* <Select defaultValue={props.scope} name={field.name} onChange={field.onChange}>
            {props.relationships.map(opt => opt)}
          </Select> */
}

const DatePicker = ({ month, year }) => {
  return (
    <div className={style.datePicker}>
      <div className={style.datePicker_month}>
        <Field
          name="month"
          render={({ field /* _form */ }) => (
            <Select name={field.name} onChange={field.onChange} defaultValue={month}>
              <option value="1">Jan</option>
              <option value="2">Feb</option>
              <option value="3">Mar</option>
              <option value="4">Apr</option>
              <option value="5">May</option>
              <option value="6">Jun</option>
              <option value="7">Jul</option>
              <option value="8">Aug</option>
              <option value="9">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </Select>
          )}
        />
      </div>
      <div className={style.datePicker_year}>
        <Field
          name="year"
          render={({ field /* _form */ }) => (
            <Select name={field.name} onChange={field.onChange} defaultValue={year}>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
            </Select>
          )}
        />
      </div>
    </div>
  );
};

class CanvasWrapper extends React.Component {
  render() {
    const {
      createValidation,
      deleteValidation,
      data,
      selectTab,
      tabId,
      tabName,
      modalIsOpen,
      modalId,
      toggleModal,
      values
    } = this.props;
    console.log(values)
    return (
      <div className={style.container}>
        <Header
          agents={data.data.agentRelationships}
          selectTab={selectTab}
          tabId={tabId}
        />
        <div className={style.validation}>
          <Panel
            large
            icon={<Icons.Globe width="18" color="#f0f0f0" />}
            title={tabName}
            actions={<DatePicker month={values.month} year={values.year} />}
          >
            <Component
              data={data}
              values={values}
              deleteValidation={deleteValidation}
              createValidation={createValidation}
              tabId={tabId}
              toggleModal={toggleModal}
            />
          </Panel>
          <ContributionModal
            modalIsOpen={modalIsOpen}
            closeModal={toggleModal}
            toggleModal={toggleModal}
            contributionId={modalId}
          />
        </div>
      </div>
    );
  }
}

// let d = new Date();
//   let m = d.getMonth();
//   let y = d.getFullYear();

const wrapperComponent = compose(
  graphql(createValidation, { name: "createValidationMutation" }),
  graphql(deleteValidation, { name: "deleteValidationMutation" }),
  withFormik({
    mapPropsToValues: props => ({
      month: new Date().getMonth() +1,
      year: new Date().getFullYear()
    }),
    validationSchema: Yup.object().shape({
      month: Yup.number(),
      year: Yup.number()
    }),
  }),
  withState("tabId", "onSelectTab", null),
  withState("tabName", "onSelectTabName", null),
  withState("modalIsOpen", "toggleModalIsOpen", false),
  withState("modalId", "selectModalId", null),
  withHandlers({
    toggleModal: props => contributionId => {
      props.selectModalId(contributionId);
      props.toggleModalIsOpen(!props.modalIsOpen);
    },
    selectTab: props => (id, name) => {
      props.onSelectTab(id);
      props.onSelectTabName(name);
    },
    createValidation: props => eventId => {
      const myAgent = props.client.readQuery({
        query: gql`
          query($token: String) {
            viewer(token: $token) {
              myAgent {
                id
              }
            }
          }
        `,
        variables: {
          token: localStorage.getItem("oce_token")
        }
      });
      return props
        .createValidationMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            validatedById: myAgent.viewer.myAgent.id,
            economicEventId: eventId
          },
          update: (store, { data }) => {
            let claimCache = store.readQuery({
              query: Claim,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: Number(props.match.params.id)
              }
            });
            // Find the process index
            let PlanIndex = claimCache.viewer.agent.agentPlans.findIndex(
              plan => {
                return (
                  Number(plan.id) ===
                  Number(
                    data.createValidation.validation.economicEvent.inputOf
                      .processPlan.id
                  )
                );
              }
            );
            let ProcessIndex = claimCache.viewer.agent.agentPlans[
              PlanIndex
            ].planProcesses.findIndex(
              process =>
                Number(process.id) ===
                Number(
                  data.createValidation.validation.economicEvent.inputOf.id
                )
            );
            // Find the commitment index
            let CommitmentIndex = claimCache.viewer.agent.agentPlans[
              PlanIndex
            ].planProcesses[ProcessIndex].committedInputs.findIndex(
              commitment =>
                commitment.fulfilledBy.some(
                  item =>
                    Number(item.fulfilledBy.id) ===
                    Number(data.createValidation.validation.economicEvent.id)
                )
            );
            // Find the event index
            let EventIndex = claimCache.viewer.agent.agentPlans[
              PlanIndex
            ].planProcesses[ProcessIndex].committedInputs[
              CommitmentIndex
            ].fulfilledBy.findIndex(
              item =>
                Number(item.fulfilledBy.id) ===
                Number(data.createValidation.validation.economicEvent.id)
            );
            claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[
              ProcessIndex
            ].committedInputs[CommitmentIndex].fulfilledBy[
              EventIndex
            ].fulfilledBy.validations.push({
              id: data.createValidation.validation.id,
              validatedBy: {
                id: data.createValidation.validation.validatedBy.id,
                name: data.createValidation.validation.validatedBy.name,
                __typename: "Person"
              },
              __typename: "Validation"
            });
            store.writeQuery({
              query: Claim,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: Number(props.match.params.id)
              },
              data: claimCache
            });
          }
        })
        .then(data => console.log(data))
        .catch(e => console.log(e));
    },
    deleteValidation: props => eventId => {
      return props
        .deleteValidationMutation({
          variables: {
            token: localStorage.getItem("oce_token"),
            id: eventId
          },
          update: (store, { data }) => {
            let claimCache = store.readQuery({
              query: Claim,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: Number(props.match.params.id)
              }
            });
            let PlanIndex = claimCache.viewer.agent.agentPlans.findIndex(
              plan =>
                Number(plan.id) ===
                Number(
                  data.deleteValidation.validation.economicEvent.inputOf
                    .processPlan.id
                )
            );
            let ProcessIndex = claimCache.viewer.agent.agentPlans[
              PlanIndex
            ].planProcesses.findIndex(
              process =>
                Number(process.id) ===
                Number(
                  data.deleteValidation.validation.economicEvent.inputOf.id
                )
            );
            let CommitmentIndex = claimCache.viewer.agent.agentPlans[
              PlanIndex
            ].planProcesses[ProcessIndex].committedInputs.findIndex(
              commitment =>
                commitment.fulfilledBy.some(
                  item =>
                    Number(item.fulfilledBy.id) ===
                    Number(data.deleteValidation.validation.economicEvent.id)
                )
            );
            let EventIndex = claimCache.viewer.agent.agentPlans[
              PlanIndex
            ].planProcesses[ProcessIndex].committedInputs[
              CommitmentIndex
            ].fulfilledBy.findIndex(
              item =>
                Number(item.fulfilledBy.id) ===
                Number(data.deleteValidation.validation.economicEvent.id)
            );
            let ValIndex = claimCache.viewer.agent.agentPlans[
              PlanIndex
            ].planProcesses[ProcessIndex].committedInputs[
              CommitmentIndex
            ].fulfilledBy[EventIndex].fulfilledBy.validations.findIndex(
              item => Number(item.id) === Number(eventId)
            );
            claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[
              ProcessIndex
            ].committedInputs[CommitmentIndex].fulfilledBy[
              EventIndex
            ].fulfilledBy.validations.splice(ValIndex, 1);
            store.writeQuery({
              query: Claim,
              variables: {
                token: localStorage.getItem("oce_token"),
                id: Number(props.match.params.id)
              },
              data: claimCache
            });
          }
        })
        .then(data => console.log(data))
        .catch(e => console.log(e));
    }
  }),
  lifecycle({
    componentDidMount() {
      this.props.selectTab(
        this.props.data.data.agentRelationships[0].object.id,
        this.props.data.data.agentRelationships[0].object.name
      );
    }
  })
)(CanvasWrapper);

export default withApollo(wrapperComponent);
