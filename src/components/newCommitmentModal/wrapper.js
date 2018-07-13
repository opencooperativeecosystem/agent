import React from 'react'
import CardModal from './index'
import Modal from '../modal'
import {  ApolloConsumer } from "react-apollo";

const NCModal = ({toggleNewCommitmentModal, modalIsOpen, closeModal, planId, match, scopeId, processId}) => (
  <Modal
    isOpen={modalIsOpen}
    toggleModal={toggleNewCommitmentModal}
    >
        <ApolloConsumer>
       {client => (
      <CardModal
        processId={processId}
        planId={planId}
        match={match}
        scopeId={scopeId}
        client={client}
        toggleModal={toggleNewCommitmentModal}
      />
    )}
    </ApolloConsumer>
  </Modal>
)

export default NCModal
