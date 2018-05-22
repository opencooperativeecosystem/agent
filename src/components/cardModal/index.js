import React from 'react'
import CardModal from './CardModal'
import Modal from 'react-modal'
import style from './index.css'

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

const UModal = ({param, loading, actionPopup, toggleActions, modalIsOpen, error, commitment, units, modalDescription, allPlanAgents, closeModal, id}) => (
  <Modal
    isOpen={modalIsOpen}
    onRequestClose={closeModal}
    contentLabel='CardModal'
    style={customStyles}
    className={{
      base: style.cardModal
    }}
    >
      <CardModal param={param} actionPopup={actionPopup} toggleActions={toggleActions} id={id} allPlanAgents={allPlanAgents} units={units} data={commitment} close={closeModal} modalDescription={modalDescription} />
  </Modal>
)

export default UModal
