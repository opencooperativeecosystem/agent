import React from 'react'
import {compose, withState, withHandlers} from 'recompose'
import {graphql} from 'react-apollo'
import Plan from '../../queries/getPlan'
import UpdateProcess from '../../mutations/updateProcess'
import {Bin, Card, Button, Input} from 'oce-components/build'
import style from './style.css'
import EditTitle from './editTitle'
import EditStart from './editStart'
import EditNote from './editNote'
import Archive from './archive'
import moment from 'moment'

const BinWrapper = ({name, note, openCardController, planId, plannedStart, id, updateProcess, actionPopup, actionPopupId, toggleActions, cards, outputs, status, openModal}) => (
  <Bin
    openCardController={openCardController}
    updateProcess={updateProcess}
    name={name}
    status={status}
    infoNote={note}
    Titleform={<EditTitle id={id} planId={planId}/>}
    Noteform={<EditNote id={id} planId={planId} />}
    Startform={<EditStart id={id} planId={planId} />}
    Archive={<Archive id={id} planId={planId} />}
    plannedStart={moment(plannedStart).format("DD MMM YYYY")}
    outputs={outputs}
    id={id}
    cardController={false}
  >
    {cards.map((card, i) => (
      <Card
        key={card.id}
        id={card.id}
        listId={id}
        status={card.isFinished}
        openCard={() => openModal(id, card.id)}
        percentage={card.percentage}
        note={card.note || card.title}
        due={moment(card.due).format("DD MMM YYYY")}
        members={card.members}
      />
    ))}
  </Bin>
)

const enhancedList = compose(
    graphql(UpdateProcess, { name: 'updateProcessMutation' }),
    withState('processStatus', 'toggleProcessStatus', props => props.status),
    withHandlers({
      updateProcess: props => event => {
        return (
          props.updateProcessMutation({
            variables: {
              token: localStorage.getItem('oce_token'),
              id: props.id,
              isFinished: !props.status
            },
            update: (store, {data}) => {
              console.log(props.planId)
              let planProcessesCache = store.readQuery({query: Plan, 
                variables: {
                  token: localStorage.getItem('oce_token'),
                  planId: Number(props.planId)
                }})
              
              const processToUpdateIndex = planProcessesCache.viewer.plan.planProcesses.findIndex(proc => proc.id === data.updateProcess.process.id)
              planProcessesCache.viewer.plan.planProcesses[processToUpdateIndex].isFinished = data.updateProcess.process.isFinished
              store.writeQuery({ query: Plan,
                variables: {
                  token: localStorage.getItem('oce_token'),
                  planId: Number(props.planId)
                },
                data: planProcessesCache })
            }
          })
          .then((data) => console.log(data))
          .catch((e) => console.log(e))
        )
      }
    })
  )(BinWrapper)

export default enhancedList
