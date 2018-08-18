import React from 'react'
import CardModal from './index'
import Modal from '../modal'
import {  ApolloConsumer } from "react-apollo";

const NCModal = ({toggleModal, modalIsOpen, closeModal, planId, match, scopeId, processId}) => (
  <Modal
    isOpen={modalIsOpen}
    toggleModal={toggleModal}
    >
    <ApolloConsumer>
       {client => (
      <CardModal
        processId={processId}
        planId={planId}
        match={match}
        scopeId={scopeId}
        client={client}
        toggleModal={toggleModal}
      />
    )}
    </ApolloConsumer>
  </Modal>
)

export default NCModal
