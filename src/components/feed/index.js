import {compose, withHandlers} from 'recompose'
import Component from './modalActivities'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import {addFlagAction} from '../../../store/actions/flags'
import {connect} from 'react-redux'


const mapDispatchToProps = dispatch => ({
  addFlag: (data) => {
    dispatch(addFlagAction(data))
  }
})


const deleteEvent = gql`
mutation ($token: String!, $id: Int!) {
    deleteEconomicEvent(
      token: $token,
      id: $id
    ) {
      economicEvent {
        action
        start
      }
    }
}
`

export const queryEvents = gql`
query ($token: String!, $id: Int!) {
    viewer(token: $token) {
        commitment(id: $id) {
          id
          fulfilledBy {
            fulfilledBy {
              action
              start
              id
              note
              provider {
                name
                image
                id
              }
            }
            fulfilledQuantity {
              numericValue
              unit {
                name
              }
            }
          }
        }
    }
}
`

export default compose(
    graphql(deleteEvent, {
      options: (props) => ({
        refetchQueries: [
          {
            query: queryEvents,
            variables: {
              token: localStorage.getItem('token'),
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
      options: ({id}) => ({ variables: { token: localStorage.getItem('token'), id: id}}),
      props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
        loading,
        error,
        refetchData: refetch,  // :NOTE: call this in the component to force reload the data
        activities: viewer ? viewer.commitment.fulfilledBy : null
      })
    }),
    connect(null, mapDispatchToProps),
    withHandlers({
      deleteEvent: ({mutate, addFlag}) => (id) => {
        return (
          mutate({
            variables: {
              token: localStorage.getItem('token'),
              id: id
            }
          })
          .then((data) => console.log(data))
          .catch(e => addFlag({
            title: 'Not authorized',
            message: 'You do not have the permission to delete that event'
          }))
        )
      }
    })
  )(Component)
