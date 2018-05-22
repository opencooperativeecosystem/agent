import { compose, withState, withHandlers } from 'recompose'
import {graphql} from 'react-apollo'
import UpdateCommitmentTitle from '../../../mutations/updateCommitmentTitle'
import ModalTitle from './modalTitle'
import {connect} from 'react-redux'

const mapStateToProps = state => ({
  state
})

export default compose(
  graphql(UpdateCommitmentTitle, {
    props: ({mutate, ownProps: {id, note}}) => ({
      mutate: mutate,
      id: id,
      note: note
    })
  }),
  connect(mapStateToProps),
  withState('isVisible', 'toggleVis', false),
  withHandlers({
    toggleVisibility: ({ toggleVis, isVisible }) => (event) => toggleVis(!isVisible),
    editTitle: ({mutate, id, note}) => (event) => mutate({
      variables: {
        token: localStorage.getItem('oce_token'),
        id: id,
        note: event.target.value
      }
    })
    .then(data => console.log(data))
    .catch(e => (console.log(e)))
  })
)(ModalTitle)

