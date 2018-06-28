import React from "react";
import CardModal from "./CardModal";
import Modal from '../modal'

const CommitmentModal = ({
  param,
  loading,
  actionPopup,
  toggleActions,
  modalIsOpen,
  error,
  commitment,
  units,
  modalDescription,
  allPlanAgents,
  processId,
  closeModal,
  toggleModal,
  id
}) => {
  return (
  <Modal
    isOpen={modalIsOpen}
    toggleModal={toggleModal}
    >
   <CardModal
      param={param}
      actionPopup={actionPopup}
      toggleActions={toggleActions}
      id={id}
      allPlanAgents={allPlanAgents}
      units={units}
      processId={processId}
      data={commitment}
      close={toggleModal}
      modalDescription={modalDescription}
    />
  </Modal>
)};

export default CommitmentModal;
