import React from 'react'
import style from './index.css'
import ModalTitle from './modalTitle'
import ModalMembers from './modalMembers/modalMembers'
import ModalActivities from './modalActivities'
import LogEvent from './logEvent'
import { compose, withState, withHandlers } from 'recompose'
import {graphql} from 'react-apollo'
import GetCommitment from '../../queries/getCommitment'
import ModalDue from './modalDue'
import ModalStatus from './modalStatus'
import ModalNote from './modalNote'
import Actions from './actions'
import {LoadingMini} from '../loading'

const CardModal = ({param, processId, id, agentId, units, loading, data, error, close}) => {
  return (
    loading ? <LoadingMini /> : (
    error ? <p style={{ color: '#ddd' }}>{error}</p> : (
    <section className={style.modal_content}>
      <ModalTitle action={data.action} amount={data.committedQuantity.numericValue} unit={data.committedQuantity.unit.name}  resource={data.resourceClassifiedAs.name} />
      <div className={style.content_info}>
        <div className={style.content_module}>
          <div className={style.module_header}>
            <div className={style.header_labels}>
              <ModalMembers members={data.involvedAgents} />
              <ModalDue due={data.due} />
              <ModalStatus isFinished={data.isFinished} />
            </div>
          </div>
          <ModalNote note={data.note} />
        </div>
        <h5 className={style.modalDescription_title}>Log your work</h5>
        <LogEvent resourceId={data.resourceClassifiedAs.id} resource={data.resourceClassifiedAs.name} processId={processId} agentId={agentId} unit={data.committedQuantity.unit.name} action={data.action} param={param} id={id} units={units} scopeId={data.scope ? data.scope.id : ''} commitmentId={data.id} />
        <h5 className={style.modalDescription_title}>Contributions</h5>
        <ModalActivities param={param} units={units} scopeId={data.scope ? data.scope.id : ''} commitmentId={data.id} id={id} />
      </div>
      <Actions close={close} processId={data.inputOf ? data.inputOf.id : data.outputOf ? data.outputOf.id: null} scopeId={data.scope ? data.scope.id : ''} id={id} planId={param} data={data} />
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
  withState('modalDescription', 'handleModalDescription', null),
  withState('actionPopup', 'toggleActionPopup', false),
  withHandlers({
    toggleActions: (props) => (event) => {
      props.toggleActionPopup(!props.actionPopup)
    }
  })
)(CardModal)
