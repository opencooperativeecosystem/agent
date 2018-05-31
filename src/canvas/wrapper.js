import React from 'react'
import Component from './index'
import { graphql } from 'react-apollo'
import Plan from '../queries/getPlan'
import CreateProcess from '../mutations/createProcess'
import {Icons, Panel} from 'oce-components/build'
import {Link} from 'react-router-dom'
import {compose, withState, withHandlers} from 'recompose'
import moment from 'moment'
import style from './style.css'
class CanvasWrapper extends React.Component {
  render () {
    const {createProcess, nameNewProcess, noteNewProcess, scope, start, newProcessDate, newProcessName, newProcessNote, newProcessScope, loading, error, viewer, modalIsOpen, modalSelected, openModal, closeModal, clicked, toggleClicked } = this.props
    return (
        loading ? <strong>Loading...</strong> : (
          error ? <p style={{ color: '#F00' }}>API error</p> : (
            <div style={{display: 'initial'}}>
              <Panel large icon={<Icons.Globe width='18' color='#f0f0f0' />} title={viewer.name} actions={<Link className={style.right_button} to={`${this.props.match.url}/validate`}><span><Icons.Validate width={18} height={18} color={'#fafafa'} /></span>Validate</Link>}>
                <Component toggleNewCommitmentModal={this.props.toggleNewCommitmentModal} newCommitmentIsOpen={this.props.newCommitmentIsOpen} createProcess={createProcess} newProcessDate={newProcessDate} nameNewProcess={nameNewProcess} noteNewProcess={noteNewProcess} scope={scope} start={start} newProcessName={newProcessName} newProcessNote={newProcessNote} newProcessScope={newProcessScope} relationships={this.props.relationships} clicked={clicked} toggleClicked={toggleClicked} data={viewer} param={this.props.match.params.id} modalIsOpen={modalIsOpen} modalSelected={modalSelected} openModal={openModal} closeModal={closeModal} />
              </Panel>
            </div>
        ))
    )
  }
}

export default compose(
  graphql(CreateProcess, { name: 'createProcessMutation' }),
  graphql(Plan, {
    options: (props) => ({
      variables: {
        token: localStorage.getItem('oce_token'),
        planId: Number(props.match.params.id)
      }
    }),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => {
      return ({
        loading: loading,
        error: error,
        viewer: viewer ? viewer.plan : null
      })
    }
  }),
  withState('modalIsOpen', 'toggleModalIsOpen', false),
  withState('newCommitmentIsOpen', 'toggleNewCommitmenIsOpen', false),
  withState('modalSelected', 'handleModalSelected', null),
  withState('clicked', 'handleClicked', false),
  withState('nameNewProcess', 'handleNameNewProcess', ''),
  withState('noteNewProcess', 'handleNoteNewProcess', ''),
  withState('scope', 'handleScopeNewProcess', null),
  withState('start', 'handleStartNewProcess', moment()),
  withHandlers({
    toggleClicked: props => () => {
      props.handleClicked(!props.clicked)
    },
    newProcessName: props => (event) => {
      props.handleNameNewProcess(event.target.value)
    },
    newProcessNote: props => (event) => {
      props.handleNoteNewProcess(event.target.value)
    },
    newProcessScope: props => (event) => {
      props.handleScopeNewProcess(event.target.value)
    },
    newProcessDate: props => (event) => {
      props.handleStartNewProcess(event)
    },
    toggleNewCommitmentModal: props => (id) => {
      props.toggleNewCommitmenIsOpen(!props.newCommitmentIsOpen)
    },
    openModal: props => (id, cardId) => {
      props.toggleModalIsOpen(true)
      props.handleModalSelected(cardId)
    },
    closeModal: props => (id, cardId) => {
      props.toggleModalIsOpen(false)
    },
    createProcess: props => event => {
      let date = moment(props.start).format("YYYY-MM-DD")
      props.createProcessMutation({
        variables: {
          token: localStorage.getItem('oce_token'),
          name: props.nameNewProcess,
          planned: date,
          planId: props.match.params.id,
          note: props.noteNewProcess,
          scope: Number(props.scope),
          duration: 9
        }
      })
      .then((data) => {console.log(data)})
      .catch((e) => console.log(e))
    }
  })
)(CanvasWrapper)
