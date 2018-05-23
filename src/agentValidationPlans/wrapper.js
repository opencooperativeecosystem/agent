import React from 'react'
import { graphql } from 'react-apollo'
import Component from './index'
import plansQuery from '../queries/getPlans'

class AgentWrapper extends React.Component {
  render () {
    const {loading, error, data} = this.props
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component data={data} {...this.props}/>
      ))
    )
  }
}

export default graphql(plansQuery, {
  options: (props) => ({ variables: {
    token: localStorage.getItem('oce_token'),
    id: props.agentProfile ? props.agentProfile : props.match.params.id
  }}),
  props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
    loading: loading,
    error: error,
    refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
    data: viewer ? viewer.agent : null
  })
})(AgentWrapper)
