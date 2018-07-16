import React from "react";
import CardModal from "./CardModal";
import Modal from '../modal'

const CommitmentModal = ({
  param,
  actionPopup,
  toggleActions,
  modalIsOpen,
  commitment,
  units,
  modalDescription,
  agentId,
  processId,
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
      units={units}
      agentId={agentId}
      processId={processId}
      data={commitment}
      close={toggleModal}
      modalDescription={modalDescription}
    />
  </Modal>
)};

export default CommitmentModal;
