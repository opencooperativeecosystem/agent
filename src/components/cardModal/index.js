import React from "react";
import CardModal from "./CardModal";
import Modal from '../modal'
import style from "./index.css";

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
  closeModal,
  id
}) => (
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
      data={commitment}
      close={closeModal}
      modalDescription={modalDescription}
    />
  </Modal>
);

export default CommitmentModal;
