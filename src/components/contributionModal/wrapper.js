import React from 'react'
import CardModal from './index'
import Modal from '../modal'

const NCModal = ({toggleModal, modalIsOpen, match, contributionId}) => (
  <Modal
    isOpen={modalIsOpen}
    toggleModal={toggleModal}
    >
      <CardModal
        match={match}
        toggleModal={toggleModal}
        contributionId={contributionId}
      />
  </Modal>
)

export default NCModal
