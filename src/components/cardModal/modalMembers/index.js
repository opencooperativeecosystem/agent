import React from 'react'
import { compose, withState, withHandlers } from 'recompose'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'
import ModalMembers from './modalMembers'

const updateCommitment = gql`
    mutation ($token: String!, $id: Int!, $providerId: Int!) {
      updateCommitment(token: $token, providerId: $providerId, id: $id) {
        commitment {
            id
            provider {
                id
                name
                image
            }
        }
      }
    }
`

export default compose(
  graphql(updateCommitment, {
    props: ({mutate, ownProps: {id, members}}) => ({
      members, id, mutate
    })
  }),
  withState('isVisible', 'toggleVis', false),
  withHandlers({
    toggleVisibility: ({ toggleVis, isVisible }) => (event) => toggleVis(!isVisible),
    editProvider: ({mutate, id, members, allPlanAgents}) => (event) => {
      return (
        mutate({
          variables: {
            token: localStorage.getItem('oce_token'),
            id: id,
            providerId: event.target.id
          }
        })
        .then((data) => console.log('hole'))
        .catch((e) => console.log(e))
      )
    }
  })
)(ModalMembers)
