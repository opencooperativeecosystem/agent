import React from "react";
import { graphql } from "react-apollo";
import Component from "./index";
import agentQuery from "../queries/getAgent";
import { LoadingMini, ErrorMini } from "../components/loading";
import { compose } from "recompose";

class AgentWrapper extends React.Component {
  render() {
    const {
      loading,
      error,
      refetchAgent,
      data,
      modalIsOpen,
      match,
      toggleModal
    } = this.props;
    return loading ? (
      <LoadingMini />
    ) : error ? (
      <ErrorMini refetch={refetchAgent} message={`Error! ${error.message}`} />
    ) : (
      <Component
        match={match}
        data={data}
        isOpen={modalIsOpen}
        toggleModal={toggleModal}
      />
    );
  }
}

export default compose(
  graphql(agentQuery, {
    options: props => ({
      variables: {
        token: localStorage.getItem("oce_token"),
        id: props.agentProfile ? props.agentProfile : props.match.params.id
      }
    }),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading: loading,
      error: error,
      refetchAgent: refetch, // :NOTE: call this in the component to force reload the data
      data: viewer ? viewer.agent : null
    })
  })
)(AgentWrapper);
