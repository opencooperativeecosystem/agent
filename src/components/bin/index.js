import React from 'react'
import {compose, withState, withHandlers} from 'recompose'
import {graphql} from 'react-apollo'
import Plan from '../../queries/getPlan'
import UpdateProcess from '../../mutations/updateProcess'
import {Bin, Card} from 'oce-components/build'

const BinWrapper = ({name, note, openCardController, plannedStart, id, updateProcess, actionPopup, actionPopupId, toggleActions, cards, outputs, status, openModal}) => (
  <Bin
    openCardController={openCardController}
    updateProcess={updateProcess}
    actionPopupId={actionPopupId}
    actionPopup={actionPopup}
    toggleActions={toggleActions}
    name={name}
    status={status}
    infoNote={note}
    plannedStart={plannedStart}
    outputs={outputs}
    id={id}
    cardController={false}
  >
    {cards.map((card, i) => (
      <Card
        key={card.id}
        id={card.id}
        listId={id}
        isFinished={card.isFinished}
        openCard={() => openModal(id, card.id)}
        percentage={card.percentage}
        note={card.note || card.title}
        due={card.due}
        members={card.members}
      />
    ))}
  </Bin>
)

const enhancedList = compose(
    graphql(UpdateProcess, {
      props: ({mutate, ownProps: {id}}) => ({
        updateProcessMutation: mutate
      })
    }),
    withState('actionPopup', 'toggleActionPopup', false),
    withState('actionPopupId', 'toggleActionPopupId', null),
    withState('processStatus', 'toggleProcessStatus', props => props.status),
    withHandlers({
      toggleActions: (props) => (id) => {
        props.toggleActionPopupId(id)
        props.toggleActionPopup(!props.actionPopup)
      },
      updateProcess: ({updateProcessMutation, id}) => (status) => {
        return (
          updateProcessMutation({
            variables: {
              token: localStorage.getItem('oce_token'),
              id: id,
              isFinished: status
            },
            update: (store, {data}) => {
              let planProcessesCache = store.readQuery({query: Plan, 
                variables: {
                  token: localStorage.getItem('oce_token'),
                  planId: Number(data.updateProcess.process.processPlan.id)
                }})
              
              const processToUpdateIndex = planProcessesCache.viewer.plan.planProcesses.findIndex(proc => proc.id === data.updateProcess.process.id)
              planProcessesCache.viewer.plan.planProcesses[processToUpdateIndex].isFinished = data.updateProcess.process.isFinished
              store.writeQuery({ query: Plan,
                variables: {
                  token: localStorage.getItem('oce_token'),
                  planId: Number(data.updateProcess.process.processPlan.id)
                },
                data: planProcessesCache })
            }
          })
          .then((data) => console.log('cancellados'))
          .catch((e) => console.log(e))
        )
      }
    })
  )(BinWrapper)

export default enhancedList
