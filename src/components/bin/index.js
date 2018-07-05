import React from 'react'
import {compose, withState, withHandlers} from 'recompose'
import {graphql} from 'react-apollo'
import Plan from '../../queries/getPlan'
import UpdateProcess from '../../mutations/updateProcess'
import {Bin, Card, Icons} from 'oce-components/build'
import EditTitle from './editTitle'
import EditStart from './editStart'
import EditNote from './editNote'
import Archive from './archive'
import moment from 'moment'
import updateNotification from "../../mutations/updateNotification";
import deleteNotification from "../../mutations/deleteNotification";
import gql from 'graphql-tag';

const BinWrapper = ({name, note, openCardController, planId, plannedStart, id, updateProcess, cards, outputs, status, openModal}) => (
  <Bin
    openCardController={openCardController}
    updateProcess={updateProcess}
    name={name}
    status={status}
    infoNote={note}
    Titleform={<EditTitle id={id} planId={planId}/>}
    Noteform={<EditNote id={id} planId={planId} />}
    Startform={<EditStart id={id} planId={planId} start={plannedStart}/>}
    Archive={<Archive id={id} planId={planId} />}
    plannedStart={moment(plannedStart).format("DD MMM YYYY")}
    outputs={outputs}
    id={id}
    cardController={false}
  >
    {cards.map((card, i) => {
      return (
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
    )})}
  </Bin>
)

const enhancedList = compose(
    graphql(UpdateProcess, { name: 'updateProcessMutation' }),
    graphql(updateNotification, {name: 'updateNotification'}),
    graphql(deleteNotification, {name: 'deleteNotification'}),
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
              store.writeFragment({
                id: data.updateProcess.process.id,
                fragment: gql`
                  fragment myProcess on Process {
                    isFinished
                    __typename
                  }
                `,
                data: {
                  isFinished: data.updateProcess.process.isFinished,
                  __typename: 'Process'
                },
              });
              // let planProcessesCache = store.readQuery({query: Plan, 
              //   variables: {
              //     token: localStorage.getItem('oce_token'),
              //     planId: Number(props.planId)
              //   }})
              
              // const processToUpdateIndex = planProcessesCache.viewer.plan.planProcesses.findIndex(proc => proc.id === data.updateProcess.process.id)
              // planProcessesCache.viewer.plan.planProcesses[processToUpdateIndex].isFinished = data.updateProcess.process.isFinished
              // store.writeQuery({ query: Plan,
              //   variables: {
              //     token: localStorage.getItem('oce_token'),
              //     planId: Number(props.planId)
              //   },
              //   data: planProcessesCache })
            }
          })
          .then((data) => props.updateNotification({variables: {
            message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Bell width='18' height='18' color='white' /></span>Process updated successfully!</div>,
            type: 'success'
          }})
          .then(res => {
            setTimeout(() => {
             props.deleteNotification({variables: {id: res.data.addNotification.id}})
           }, 1000);
          })
        )
          
          .catch((e) => {
            const errors = e.graphQLErrors.map(error => error.message);
          props.setSubmitting(false);
          props.updateNotification({variables: {
            message: <div style={{fontSize:'14px'}}><span style={{marginRight: '10px', verticalAlign: 'sub'}}><Icons.Cross width='18' height='18' color='white' /></span>{errors}</div>,
            type: 'alert'
          }})
          .then(res => {
            setTimeout(() => {
             props.deleteNotification({variables: {id: res.data.addNotification.id}})
           }, 1000);
          })
        })
        )
      }
    })
  )(BinWrapper)

export default enhancedList
