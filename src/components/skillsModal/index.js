import React from "react";
import Component from "./skillsModal";
import Modal from "../modal";

const PlanModal = ({
  toggleModal,
  isOpen,
  skills
}) =>  (
  <Modal isOpen={isOpen} toggleModal={toggleModal}>
    <Component skills={skills} />
  </Modal>
);

export default PlanModal;
