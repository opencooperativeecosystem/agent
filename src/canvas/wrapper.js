import React from "react";
import Bins from "./index";
import { Query } from "react-apollo";
import Plan from "../queries/getPlan";
import { Icons, Panel } from "oce-components/build";
import { Link } from "react-router-dom";
import { compose, withState, withHandlers } from "recompose";
import style from "./style.css";
import CardModal from "../components/cardModal";
import NewCommitmentModal from "../components/newCommitmentModal/wrapper";

const CanvasWrapper = ({
  match,
  toggleNewCommitmentModal,
  newCommitmentIsOpen,
  relationships,
  modalIsOpen,
  modalSelected,
  openModal,
  closeModal
}) => (
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
          <CardModal
            allPlanAgents={data.viewer.plan.allPlanAgents}
            modalIsOpen={modalIsOpen}
            closeModal={closeModal}
            id={modalSelected}
            param={match.params.id}
          />
          <NewCommitmentModal
            modalIsOpen={newCommitmentIsOpen}
            closeModal={toggleNewCommitmentModal}
          />
        </div>
      );
    }}
  </Query>
);

export default compose(
  withState("modalIsOpen", "toggleModalIsOpen", false),
  withState("newCommitmentIsOpen", "toggleNewCommitmenIsOpen", false),
  withState("modalSelected", "handleModalSelected", null),
  withHandlers({
    toggleNewCommitmentModal: props => id => {
      props.toggleNewCommitmenIsOpen(!props.newCommitmentIsOpen);
    },
    openModal: props => (id, cardId) => {
      props.toggleModalIsOpen(true);
      props.handleModalSelected(cardId);
    },
    closeModal: props => (id, cardId) => {
      props.toggleModalIsOpen(false);
    }
  })
)(CanvasWrapper);
