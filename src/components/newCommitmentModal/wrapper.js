import React from 'react'
import CardModal from './index'
import Modal from '../modal'
import style from './style.css'

const NCModal = ({toggleNewCommitmentModal, modalIsOpen, closeModal, planId, match, scopeId, processId}) => (
  <Modal
    isOpen={modalIsOpen}
    toggleModal={toggleNewCommitmentModal}
    >
      <CardModal
        processId={processId}
        planId={planId}
        match={match}
        scopeId={scopeId}
      />
  </Modal>
)

export default NCModal
