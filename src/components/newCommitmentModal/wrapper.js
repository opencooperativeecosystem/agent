import React from 'react'
import CardModal from './index'
import Modal from 'oce-components/build'
import style from './style.css'

const customStyles = {
  overlay: {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.6)',
    zIndex            : 9999999,
    height            : '100%',
    justifyContent    : 'center',
    overflow          : 'auto'
  }
  // content: {
  //   width                 : '450px',
  //   boxShadow             : '0 2px 8px 3px rgba(0,0,0,.3)',
  //   zIndex                : 9999999999,
  //   backgroundColor       : '#EDEFF0',
  //   padding:  0,
  //   margin:  '40px auto',
  //   position: 'relative'
  // }
}

const UModal = ({modalIsOpen, closeModal, planId, match, scopeId, processId}) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel='Commitment Modal'
    style={customStyles}
    // className={{
    //   base: style.cardModal
    // }}
    >
      <CardModal
        processId={processId}
        planId={planId}
        match={match}
        scopeId={scopeId}
      />
  </Modal>
)

export default UModal
