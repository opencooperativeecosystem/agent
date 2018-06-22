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
  id
}) => {
  console.log(processId)
  return (
  <Modal
    isOpen={modalIsOpen}
    toggleModal={closeModal}
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
      close={closeModal}
      modalDescription={modalDescription}
    />
  </Modal>
)};

export default CommitmentModal;
