import List from './list'
import {compose, withState, withHandlers} from 'recompose'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import Plan from '../queries/getPlan'

const updateProcess = gql`
mutation ($token: String!, $id: Int!, $isFinished: Boolean ) {
  updateProcess(
    token: $token, 
    id: $id, 
    isFinished: $isFinished
  ) {
    process {
      processPlan {
        id
      }
      id
      name
      isFinished
    }
  }
}`

const enhancedList = compose(
    graphql(updateProcess, {
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
  )(List)

export default enhancedList
