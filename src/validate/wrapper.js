import React from "react";
import Component from "./index";
import { graphql, withApollo } from "react-apollo";
import Claim from "../queries/getClaims";
import createValidation from "../mutations/createValidation";
import deleteValidation from "../mutations/deleteValidation";
import { compose, withHandlers } from "recompose";
import gql from "graphql-tag";
import { Icons, Panel } from "oce-components/build";
import style from "./style.css";
import { LoadingMini, ErrorMini } from "../components/loading";

class CanvasWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      myAgentId: null
    };
  }

  componentDidMount() {
    const myAgent = this.props.client.readQuery({
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
    this.setState({
      myAgentId: myAgent.viewer.myAgent.id
    });
  }
  render() {
    const {
      createValidation,
      match,
      deleteValidation,
      loading,
      error,
      networkStatus,
      refetch,
      data
    } = this.props;
    console.log(networkStatus)
    return loading ? (
      <LoadingMini />
    ) : error ? (
      <ErrorMini refetch={refetch} message={`Error! ${error.message}`} />
    ) : (
      <div className={style.container}>
        <Panel
          large
          icon={<Icons.Globe width="18" color="#f0f0f0" />}
          title={"Validate"}
        >
          <Component
            param={match.params.id}
            data={data}
            myAgentId={this.state.myAgentId}
            deleteValidation={deleteValidation}
            createValidation={createValidation}
          />
        </Panel>
      </div>
    );
  }
}

const wrapperComponent = compose(
  graphql(Claim, {
    options: props => ({
      variables: {
        token: localStorage.getItem("oce_token"),
        id: Number(props.match.params.id)
      }
    }),
    props: ({ ownProps, data: { viewer,networkStatus, loading, error, refetch } }) => {
      return {
        loading: loading,
        error: error,
        data: viewer ? viewer.agent.agentPlans : null,
        refetch: refetch,
        networkStatus: networkStatus
      };
    }
  }),
  graphql(createValidation, { name: "createValidationMutation" }),
  graphql(deleteValidation, { name: "deleteValidationMutation" }),
  withHandlers({
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
            let PlanIndex = claimCache.viewer.agent.agentPlans.findIndex(plan => {
                return Number(plan.id) === Number(
                data.createValidation.validation.economicEvent.inputOf.processPlan.id
            )})
            let ProcessIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses.findIndex(
              process =>
                Number(process.id) ===
                Number(
                  data.createValidation.validation.economicEvent.inputOf.id
                )
            );
            // Find the commitment index
            let CommitmentIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[
              ProcessIndex
            ].committedInputs.findIndex(commitment =>
              commitment.fulfilledBy.some(
                item =>
                  Number(item.fulfilledBy.id) ===
                  Number(data.createValidation.validation.economicEvent.id)
              )
            );
            // Find the event index
            let EventIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[
              ProcessIndex
            ].committedInputs[CommitmentIndex].fulfilledBy.findIndex(
              item =>
                Number(item.fulfilledBy.id) ===
                Number(data.createValidation.validation.economicEvent.id)
            );
            claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[ProcessIndex].committedInputs[
              CommitmentIndex
            ].fulfilledBy[EventIndex].fulfilledBy.validations.push({
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
            let PlanIndex = claimCache.viewer.agent.agentPlans.findIndex(plan => Number(plan.id) === Number(
                data.deleteValidation.validation.economicEvent.inputOf.processPlan.id
            ))
            let ProcessIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses.findIndex(
              process =>
                Number(process.id) ===
                Number(
                  data.deleteValidation.validation.economicEvent.inputOf.id
                )
            );
            let CommitmentIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[
              ProcessIndex
            ].committedInputs.findIndex(commitment =>
              commitment.fulfilledBy.some(
                item =>
                  Number(item.fulfilledBy.id) ===
                  Number(data.deleteValidation.validation.economicEvent.id)
              )
            );
            let EventIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[
              ProcessIndex
            ].committedInputs[CommitmentIndex].fulfilledBy.findIndex(
              item =>
                Number(item.fulfilledBy.id) ===
                Number(data.deleteValidation.validation.economicEvent.id)
            );
            let ValIndex = claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[
              ProcessIndex
            ].committedInputs[CommitmentIndex].fulfilledBy[
              EventIndex
            ].fulfilledBy.validations.findIndex(
              item => Number(item.id) === Number(eventId)
            );
            claimCache.viewer.agent.agentPlans[PlanIndex].planProcesses[ProcessIndex].committedInputs[
              CommitmentIndex
            ].fulfilledBy[EventIndex].fulfilledBy.validations.splice(
              ValIndex,
              1
            );
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
  })
)(CanvasWrapper);

export default withApollo(wrapperComponent);
