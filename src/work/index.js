import React from 'react'
import {Icons, Panel, NavigationItem} from 'oce-components/build'
import style from './style.css'
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom"
import Canvas from '../canvas/wrapper'
import AgentRelationships from '../agentRelationships'
import {PropsRoute} from '../helpers/router'

// ROUTES
import AgentPlans from '../agentPlans/wrapper'

const Work = (props) => {
  console.log(props)
  return (
    <Router>
      <div className={style.container}>
        <PropsRoute path={`${props.match.path}/`} component={AgentRelationships} relationships={props.relationships} />
        {/* <AgentRelationships relationships={props.relationships} match={props.match} /> */}
        <PropsRoute path={`${props.match.path}/agent/:id`} component={AgentPlans} />
        {/* <PropsRoute path={`${props.match.path}/plans/:id`} component={Canvas} relationships={props.relationships} /> */}
        {/* <Route path={`${props.match.path}/:id`} component={<Canvas {...props} />} /> */}
      </div>
    </Router>
  )
}

export default Work
