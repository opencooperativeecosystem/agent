import React from 'react'
import CardModal from './index'
import Modal from '../modal'

const NCModal = ({toggleModal,handleChange, note, myId, modalIsOpen, match, contributionId, createValidation, deleteValidation}) => (
  <Modal
    isOpen={modalIsOpen}
    toggleModal={toggleModal}
    >
      <CardModal
        match={match}
        toggleModal={toggleModal}
        contributionId={contributionId}
        createValidation={createValidation}
        deleteValidation={deleteValidation}
        myId={myId}
        note={note}
        handleChange={handleChange}
      />
  </Modal>
)

export default NCModal
