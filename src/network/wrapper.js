import React from 'react'
import { graphql } from 'react-apollo'
import Component from './index'
import agentQuery from '../queries/getRelationships'
import orgsQuery from '../queries/getOrganizations'
import {compose} from 'recompose'

class NetworkWrapper extends React.Component {
  render () {
    const {loading, orgsloading, orgserror, error, data, orgs} = this.props
    return (
      loading || orgsloading ? <strong>Loading...</strong> : (
        error || orgserror ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component orgs={orgs} data={data} />
      ))
    )
  }
}

export default compose(
  graphql(orgsQuery, {
    options: (props) => ({ variables: {
      token: localStorage.getItem('oce_token')
    }}),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      orgsloading: loading,
      orgserror: error,
      refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
      orgs: viewer ? viewer.fcOrganizations : null
  })}),
  graphql(agentQuery, {
    options: (props) => ({ variables: {
      token: localStorage.getItem('oce_token')
    }}),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading: loading,
      error: error,
      refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
      data: viewer ? viewer.myAgent : null
    })}
))(NetworkWrapper)
