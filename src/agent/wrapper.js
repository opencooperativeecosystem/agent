import React from "react";
import { graphql } from "react-apollo";
import Component from "./index";
import agentQuery from "../queries/getAgent";
import { LoadingMini } from "../components/loading";
import {compose, withState, withHandlers} from "recompose";
import SkillsModal from "../components/skillsModal";

class AgentWrapper extends React.Component {
  render() {
    const { loading, error, data, modalIsOpen, toggleModal } = this.props;
    return loading ? (
      <LoadingMini />
    ) : error ? (
      <p style={{ color: "#F00" }}>API error</p>
    ) : (
      <div>
        <Component data={data} isOpen={modalIsOpen} toggleModal={toggleModal} />
        <SkillsModal isOpen={modalIsOpen} toggleModal={toggleModal} skills={data.agentSkills}/>
      </div>
    );
  }
}

export default compose(
  withState("modalIsOpen", "toggleModalIsOpen", false),
  withHandlers({
    toggleModal: props => () => {
      props.toggleModalIsOpen(!props.modalIsOpen)
    }
  }),
  graphql(agentQuery, {
    options: props => ({
      variables: {
        token: localStorage.getItem("oce_token"),
        id: props.agentProfile ? props.agentProfile : props.match.params.id
      },
    }),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading: loading,
      error: error,
      refetchAgent: refetch, // :NOTE: call this in the component to force reload the data
      data: viewer ? viewer.agent : null
    })
  })
)(AgentWrapper);
