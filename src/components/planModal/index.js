import React from "react";
import Component from "./PlanModal";
import Modal from "../modal";

const PlanModal = ({
  toggleModal,
  isOpen,
  planId,
  match,
  scopeId,
  title,
  note,
  history
}) => (
  <Modal isOpen={isOpen} toggleModal={toggleModal}>
    <Component
      planId={planId}
      match={match}
      scopeId={scopeId}
      title={title}
      note={note}
      history={history}
    />
  </Modal>
);

export default PlanModal;
