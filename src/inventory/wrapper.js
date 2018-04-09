import React from 'react'
import { graphql } from 'react-apollo'
import Component from './index'
import InventoryQuery from '../queries/getInventory'
import {compose} from 'recompose'

class Inventory extends React.Component {
  render () {
    const {loading, error, data} = this.props
    return (
      loading ? <strong>Loading...</strong> : (
        error ? <p style={{ color: '#F00' }}>API error</p> : (
          <Component data={data} />
      ))
    )
  }
}

export default compose(
  graphql(InventoryQuery, {
    options: (props) => ({ variables: {
      token: localStorage.getItem('oce_token')
    }}),
    props: ({ ownProps, data: { viewer, loading, error, refetch } }) => ({
      loading: loading,
      error: error,
      refetchAgent: refetch,  // :NOTE: call this in the component to force reload the data
      data: viewer ? viewer.myAgent : null
  })})
)(Inventory)
