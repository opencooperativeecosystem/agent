import React from 'react'
import style from './index.css'
import ModalTitle from './modalTitle'
import ModalMembers from './modalMembers'
import ModalActivities from './modalActivities'
import LogEvent from './logEvent'
import { compose, withState, withHandlers } from 'recompose'
import {graphql} from 'react-apollo'
import GetCommitment from '../../queries/getCommitment'
import UpdateCommitmentStatus from '../../mutations/updateCommitmentStatus'
import moment from 'moment'

const CardModal = ({param, id, toggleActions, actionPopup, updateCommitment, allPlanAgents, units, updateProcess, loading, data, error, close, modalDescription}) => {
  return (
    loading ? <h1>loading...</h1> : (
    error ? <p style={{ color: '#ddd' }}>API error</p> : (
    <section className={style.modal_content}>
      { actionPopup
      ? <div className={style.content_actions}>
        <div className={style.actions_item} onClick={() => updateCommitment(!data.isFinished)}>
          <h5>Set as {data.isFinished ? 'Incompleted' : 'Completed'}</h5>
        </div>
      </div>
       : ''}
      <ModalTitle toggleActions={toggleActions} close={close} id={data.id} note={data.note} />
      <div className={style.content_info}>
        <div className={style.content_module}>
          <div className={style.module_header}>
            <div className={style.header_labels}>
              <ModalMembers provider={data.provider} id={data.id} allPlanAgents={allPlanAgents} members={data.involvedAgents} />
              <div className={style.labels_actions}>
                <h5 className={style.modalDescription_title}>Due</h5>
                <div className={style.due}>
                  <span className={style.due_item}>{moment(data.due).format('DD MMM YYYY')}</span>
                </div>
              </div>
              <div className={style.labels_actions}>
                <h5 className={style.modalDescription_title}>Status</h5>
                <div className={data.isFinished ? style.labels_isFinished : style.labels_isFinished + ' ' + style.incomplete} >
                  <h5>{data.isFinished ? 'Completed' : 'Incompleted'}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className={modalDescription ? style.content_description + ' ' + style.hidden : style.content_description}>
            <h5 className={style.modalDescription_title}>Commitment</h5>
            <h4>{data.action + ' ' + data.committedQuantity.numericValue + ' ' + data.committedQuantity.unit.name + ' of ' + data.resourceClassifiedAs.name}</h4>
          </div>
        </div>
        <LogEvent param={param} id={id} units={units} scopeId={data.scope.id} commitmentId={data.id} />
        <h5 className={style.modalDescription_title}>Contributions</h5>
        <ModalActivities param={param} units={units} scopeId={data.scope.id} commitmentId={data.id} id={id} />
      </div>
    </section>
    ))
  )
}

export default compose(
  graphql(GetCommitment, {
    options: ({id}) => ({ variables: { token: localStorage.getItem('oce_token'), id: id}}),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading,
      error,
      refetchData: refetch,  // :NOTE: call this in the component to force reload the data
      data: viewer ? viewer.commitment : null,
      units: viewer ? viewer.allUnits : null
    })
  }),
  graphql(UpdateCommitmentStatus, {
    props: ({mutate, ownProps: {id}}) => ({
      updateCommitmentMutation: mutate
    })
  }),
  withState('modalDescription', 'handleModalDescription', null),
  withState('actionPopup', 'toggleActionPopup', false),
  withHandlers({
    toggleActions: (props) => (event) => {
      props.toggleActionPopup(!props.actionPopup)
    },
    updateCommitment: ({updateCommitmentMutation, id}) => (status) => {
      return (
        updateCommitmentMutation({
          variables: {
            token: localStorage.getItem('oce_token'),
            id: id,
            isFinished: status
          },
          update: (store, {data}) => {
            let commitmentCache = store.readQuery({query: GetCommitment,
              variables: {
                token: localStorage.getItem('oce_token'),
                id: Number(id)
              }})
            console.log(commitmentCache)
            console.log(data)

            commitmentCache.viewer.commitment.isFinished = data.updateCommitment.commitment.isFinished
            store.writeQuery({ query: GetCommitment,
              variables: {
                token: localStorage.getItem('oce_token'),
                id: Number(id)
              },
              data: commitmentCache })
          }
        })
        .then((data) => console.log('cancellados'))
        .catch((e) => console.log(e))
      )
    }
  })
)(CardModal)
