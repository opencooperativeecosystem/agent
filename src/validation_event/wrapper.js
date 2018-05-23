import React from 'react'
import Component from './index'
import { graphql, withApollo } from 'react-apollo'
import EventClaim from '../queries/getEventClaim'
import createValidation from '../mutations/createValidation'
import deleteValidation from '../mutations/deleteValidation'
import {compose, withHandlers} from 'recompose'
import gql from 'graphql-tag'

class CommittmentWrapper extends React.Component {
  constructor () {
    super()
    this.state = {
      myAgentId: null
    }
  }

  componentDidMount () {
    const myAgent = this.props.client.readQuery({
      query: gql`
      query ($token: String) {
        viewer(token: $token) {
          myAgent {
            id
          }
        }
      }
      `,
      variables: {
        token: localStorage.getItem('oce_token')
      }
    })
    this.setState({
      myAgentId: myAgent.viewer.myAgent.id
    })
  }
  render () {
    const {createValidation, deleteValidation, loading, error, data} = this.props
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component data={data} myAgentId={this.state.myAgentId} deleteValidation={deleteValidation} createValidation={createValidation} />
      ))
    )
  }
}

const wrapperComponent = compose(
  graphql(EventClaim, {
    options: (props) => ({
      variables: {
        token: localStorage.getItem('oce_token'),
        id: Number(props.match.params.id)
      }
    }),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => {
      return ({
        loading: loading,
        error: error,
        data: viewer ? viewer.economicEvent : null
    })}
  }),
  graphql(createValidation, { name: 'createValidationMutation' }),
  graphql(deleteValidation, { name: 'deleteValidationMutation' }),
  withHandlers({
    createValidation: props => (eventId) => {
      const myAgent = props.client.readQuery({
        query: gql`
        query ($token: String) {
          viewer(token: $token) {
            myAgent {
              id
            }
          }
        }
        `,
        variables: {
          token: localStorage.getItem('oce_token')
        }
      })
      return props.createValidationMutation({
        variables: {
          token: localStorage.getItem('oce_token'),
          validatedById: myAgent.viewer.myAgent.id,
          economicEventId: eventId
        },
        update: (store, { data }) => {
          let claimCache = store.readQuery({ query: EventClaim,
            variables: {
              token: localStorage.getItem('oce_token'),
              id: Number(props.match.params.id)
            }}
          )
          claimCache.viewer.economicEvent
          .validations
          .push({
            id: data.createValidation.validation.id,
            validatedBy: {
              id: data.createValidation.validation.validatedBy.id,
              name: data.createValidation.validation.validatedBy.name,
              __typename:"Person"
            },
            __typename:"Validation"
          })
          store.writeQuery({ query: EventClaim,
            variables: {
              token: localStorage.getItem('oce_token'),
              id: Number(props.match.params.id)
            },
            data: claimCache })
        }
      })
        .then((data) => console.log(data))
        .catch((e) => console.log(e))
    },
    deleteValidation: props => (eventId) => {
      return props.deleteValidationMutation({
        variables: {
          token: localStorage.getItem('oce_token'),
          id: eventId
        },
        update: (store, { data }) => {
          let claimCache = store.readQuery({ query: EventClaim,
            variables: {
              token: localStorage.getItem('oce_token'),
              id: Number(props.match.params.id)
            }}
          )
          let ValIndex = claimCache.viewer.economicEvent.validations.findIndex(item => Number(item.id) === Number(eventId))
          claimCache.viewer.economicEvent
          .validations
          .splice(ValIndex, 1)
          store.writeQuery({ query: EventClaim,
            variables: {
              token: localStorage.getItem('oce_token'),
              id: Number(props.match.params.id)
            },
            data: claimCache })
        }
      })
        .then((data) => console.log(data))
        .catch((e) => console.log(e))
    }
  })
)(CommittmentWrapper)

export default withApollo(wrapperComponent)
