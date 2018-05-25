import React from 'react'
import Component from './index'
import { graphql } from 'react-apollo'
import Plan from '../queries/getPlan'
import {Icons, Panel} from 'oce-components/build'
import {compose, withState, withHandlers} from 'recompose'

class CanvasWrapper extends React.Component {
  render () {
    const {loading, error, viewer, modalIsOpen, modalSelected, openModal, closeModal } = this.props
    return (
        loading ? <strong>Loading...</strong> : (
          error ? <p style={{ color: '#F00' }}>API error</p> : (
            <div style={{display: 'initial'}}>
              <Panel large icon={<Icons.Globe width='18' color='#f0f0f0' />} title={viewer.name}>
                <Component data={viewer} param={this.props.match.params.id} modalIsOpen={modalIsOpen} modalSelected={modalSelected} openModal={openModal} closeModal={closeModal} />
              </Panel>
            </div>
        ))
    )
  }
}

export default compose(
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
  withState('modalSelected', 'handleModalSelected', null),
  withHandlers({
    openModal: props => (id, cardId) => {
      props.toggleModalIsOpen(true)
      props.handleModalSelected(cardId)
    },
    closeModal: props => (id, cardId) => {
      props.toggleModalIsOpen(false)
    }
  })
)(CanvasWrapper)
