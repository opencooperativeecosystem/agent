import React from 'react'
import Component from '../agent/wrapper'

const Overview = ({id, match}) => {
  return <Component match={match} agentProfile={id} />
}

export default Overview
