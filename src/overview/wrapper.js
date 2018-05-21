import React from 'react'
import Component from '../agent/wrapper'

class Overview extends React.Component {
  render () {
    return <Component agentProfile={this.props.agentData.data.id} />
  }
}

export default Overview
