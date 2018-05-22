import React from 'react'
import Component from './index'
import { graphql } from 'react-apollo'
import Plan from '../queries/getPlan'
import {Icons, Panel} from 'oce-components/build'
import style from './style.css'
class CanvasWrapper extends React.Component {
  render () {
    const {loading, error, viewer} = this.props
    return (
        loading ? <strong>Loading...</strong> : (
          error ? <p style={{ color: '#F00' }}>API error</p> : (
            <div className={style.container}>
            <Panel large icon={<Icons.Globe width='18' color='#f0f0f0' />} title={viewer.name}>
              <Component data={viewer} param={this.props.match.params.id} />
            </Panel>
            </div>
        ))
    )
  }
}

export default graphql(Plan, {
  options: (props) => ({ 
    variables: {
      token: localStorage.getItem('oce_token'),
      planId: Number(props.match.params.id)
    }
  }),
  props: ({ ownProps, data: { viewer, loading, error, refetch } }) => {
    return ({
      loading: loading,
      error: error,
      viewer: viewer ? viewer.plan : null
  })}
})(CanvasWrapper)
