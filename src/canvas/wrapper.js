import React from "react";
import Bins from "./index";
import { Query } from "react-apollo";
import Plan from "../queries/getPlan";
import { Icons, Panel } from "oce-components/build";
import { Link } from "react-router-dom";
import { compose, withState, withHandlers } from "recompose";
import style from "./style.css";
import CardModal from "../components/cardModal";
import NewCommitmentModal from "../components/newCommitmentModal";

const CanvasWrapper = ({
  match,
  toggleNewCommitmentModal,
  newCommitmentIsOpen,
  relationships,
  modalIsOpen,
  modalSelected,
  processId,
  openModal,
  scopeId,
  closeModal
}) => {
  console.log(newCommitmentIsOpen)
  return (
  <Query
    query={Plan}
    variables={{
      token: localStorage.getItem("oce_token"),
      planId: Number(match.params.id)
    }}
  >
    {({ loading, error, data }) => {
      if (loading) return null;
      if (error) return `Error!: ${error}`;
      return (
        <div style={{ display: "initial" }}>
          <Panel
            large
            icon={<Icons.Globe width="18" color="#f0f0f0" />}
            title={data.viewer.plan.name}
            actions={
              <Link className={style.right_button} to={`${match.url}/validate`}>
                <span>
                  <Icons.Validate width={18} height={18} color={"#fafafa"} />
                </span>Validate
              </Link>
            }
          >
            <Bins
              toggleNewCommitmentModal={toggleNewCommitmentModal}
              newCommitmentIsOpen={newCommitmentIsOpen}
              relationships={relationships}
              data={data.viewer.plan}
              match={match}
              param={match.params.id}
              modalIsOpen={modalIsOpen}
              modalSelected={modalSelected}
              openModal={openModal}
              closeModal={closeModal}
            />
          </Panel>
          {/* <CardModal
            allPlanAgents={data.viewer.plan.allPlanAgents}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            id={modalSelected}
            param={match.params.id}
          /> */}
          <NewCommitmentModal
            modalIsOpen={newCommitmentIsOpen}
            toggleNewCommitmentModal={toggleNewCommitmentModal}
            processId={processId}
            planId={match.params.id}
            match={match}
            scopeId={scopeId}
          />
        </div>
      );
    }}
  </Query>
)};

export default compose(
  withState("modalIsOpen", "toggleModalIsOpen", false),
  withState("newCommitmentIsOpen", "toggleNewCommitmenIsOpen", false),
  withState("modalSelected", "handleModalSelected", null),
  withState("processId", "updateProcessId", null),
  withState("scopeId", "updateScopeId", null),
  withHandlers({
    toggleNewCommitmentModal: props => (id, scope) => {
      console.log(id)
      console.log(scope)
      props.toggleNewCommitmenIsOpen(!props.newCommitmentIsOpen);
      props.updateProcessId(id)
      props.updateScopeId(scope)
    },
    openModal: props => (id, cardId) => {
      props.toggleModalIsOpen(true);
      props.handleModalSelected(cardId);
    },
    closeModal: props => (id, cardId) => {
      props.toggleModalIsOpen(false);
    },
    toggleModal: props => (id, cardId) => {
      props.toggleModalIsOpen(!props.modalIsOpen)
      props.handleModalSelected(cardId);
    }
  })
)(CanvasWrapper);
