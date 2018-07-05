import React from "react";
import Component from "./PlanModal";
import Modal from "../modal";

const PlanModal = ({
  toggleModal,
  isOpen,
  planId,
  match,
  scopeId,
  isDeletable,
  title,
  note,
  history
}) =>  (
  <Modal isOpen={isOpen} toggleModal={toggleModal}>
    <Component
      planId={planId}
      match={match}
      scopeId={scopeId}
      title={title}
      note={note}
      history={history}
      isDeletable={isDeletable}
    />
  </Modal>
);

export default PlanModal;
