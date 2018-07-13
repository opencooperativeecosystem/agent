import React from "react";
import Bins from "./index";
import { Query } from "react-apollo";
import Plan from "../queries/getPlan";
import { Icons, Panel, Button } from "oce-components/build";
import { Link } from "react-router-dom";
import { compose, withState, withHandlers } from "recompose";
import style from "./style.css";
import CardModal from "../components/cardModal";
import NewCommitmentModal from "../components/newCommitmentModal/wrapper";
import PlanModal from '../components/planModal'
import { LoadingMini } from "../components/loading";

const ErrorPlan = () => (
  <div className={style.errorWrapper}>
    <h1 className={style.errorEmoji}>🕳️</h1>
    <h3 className={style.errorWrapperTitle}>This plan is closed.</h3>
    <h5 className={style.errorWrapperDesc}>The plan may be closed or inexistent</h5>
    <Link className={style.errorLink} to='/'>Back home</Link>
  </div>
)


const CanvasWrapper = ({
  match,
  toggleNewCommitmentModal,
  newCommitmentIsOpen,
  relationships,
  modalIsOpen,
  modalSelected,
  processId,
  history,
  openModal,
  toggleModal,
  scopeId,
  closeModal,
  onTogglePlanModal,
  planModalIsOpen,
  agentId
}) => (
  <Query
    query={Plan}
    variables={{
      token: localStorage.getItem("oce_token"),
      planId: Number(match.params.id)
    }}
  >
    {({ loading, error, data }) => {
      if (loading) return <LoadingMini />;
      if (error) return <ErrorPlan />;
      return (
        <div style={{ display: "initial" }}>
          <Panel
            large
            icon={<Icons.Globe width="18" color="#f0f0f0" />}
            title={data.viewer.plan.name}
            navigation
            back={() => history.goBack()}
            forward={() => history.goForward()}
            actions={
              <div>
              <Button small onClick={onTogglePlanModal}><span data-edit='edit-plan' className={style.buttonIcon}><Icons.Edit width='16' height='16' color='#fff' /></span> Edit Plan</Button>
              <Link className={style.right_button} to={`${match.url}/validate`}>
                <span>
                  <Icons.Validate width={18} height={18} color={"#fafafa"} />
                </span>Validate
              </Link>
              </div>
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
            toggleModal={toggleModal}
            id={modalSelected}
            param={match.params.id}
            processId={processId}
            agentId={agentId}
          />
          <PlanModal
            isOpen={planModalIsOpen}
            toggleModal={onTogglePlanModal}
            param={match.params.id}
            title={data.viewer.plan.name}
            note={data.viewer.plan.note}
            planId={match.params.id}
            history={history}
            isDeletable={data.viewer.plan.isDeletable}
            due={data.viewer.plan.due}
            start={data.viewer.plan.plannedOn}
          />
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
);

export default compose(
  withState("modalIsOpen", "toggleModalIsOpen", false),
  withState("newCommitmentIsOpen", "toggleNewCommitmenIsOpen", false),
  withState("planModalIsOpen", "togglePlanModal", false),
  withState("modalSelected", "handleModalSelected", null),
  withState("processId", "updateProcessId", null),
  withState("scopeId", "updateScopeId", null),
  withHandlers({
    toggleNewCommitmentModal: props => (id, scope) => {
      props.toggleNewCommitmenIsOpen(!props.newCommitmentIsOpen);
      props.updateProcessId(id)
      props.updateScopeId(scope)
    },
    openModal: props => (id, cardId) => {
      props.toggleModalIsOpen(true);
      props.handleModalSelected(cardId);
    },
    onTogglePlanModal: props => () => {
      props.togglePlanModal(!props.planModalIsOpen);
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
