import {compose, withHandlers, withState} from 'recompose'
import Component from './modalActivities'
import {graphql} from 'react-apollo'
import queryEvents from '../../../queries/getEvents'
import deleteEvent from '../../../mutations/deleteEvent'

export default compose(
    graphql(deleteEvent, {
      options: (props) => ({
        refetchQueries: [
          {
            query: queryEvents,
            variables: {
              token: localStorage.getItem('oce_token'),
              id: props.id
            }
          }
        ]
      }),
      props: ({mutate, ownProps: {id}}) => ({
        id, mutate
      })
    }),
    graphql(queryEvents, {
      options: ({id}) => ({ variables: { token: localStorage.getItem('oce_token'), id: id}}),
      props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
        loading,
        error,
        refetchData: refetch,  // :NOTE: call this in the component to force reload the data
        activities: viewer ? viewer.commitment.fulfilledBy : null
      })
    }),
    // connect(mapStateToProps, mapDispatchToProps),
    withState('deleteEventModal', 'toggleDeleteEvent', false),
    withState('idEventToDelete', 'setIdToDelete', ''),
    withState('editEventModal', 'toggleEditEvent', false),
    withState('idEventToEdit', 'setIdToUpdate', ''),
    withHandlers({
      toggleDeleteEvent: (props) => (status, id) => {
        props.setIdToDelete(id)
        props.toggleDeleteEvent(!status)
      },
      toggleEditEvent: (props) => (status, id) => {
        props.setIdToUpdate(id)
        props.toggleEditEvent(!status)
      },
      deleteEvent: ({toggleDeleteEvent, deleteEventModal, mutate}) => (id) => {
        return (
          mutate({
            variables: {
              token: localStorage.getItem('oce_token'),
              id: id
            }
          })
          .then((data) => {
            // sendNotif(Math.random(), '✌️✌️✌️ Event deleted correctly', 'success', '5000')
            toggleDeleteEvent(!deleteEventModal)
          })
          .catch(e => console.log(e))
        )
      }
    })
  )(Component)
