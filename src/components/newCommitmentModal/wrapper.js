import React from 'react'
import CardModal from './index'
import Modal from 'oce-components/build'
import style from './style.css'

const UModal = ({toggleNewCommitmentModal, modalIsOpen, closeModal, planId, match, scopeId, processId}) => (
  <Modal
    isOpen={modalIsOpen}
    toggleModal={toggleNewCommitmentModal}
    >
    <h1>sadsa</h1>
      {/* <CardModal
        processId={processId}
        planId={planId}
        match={match}
        scopeId={scopeId}
      /> */}
  </Modal>
)

export default UModal
