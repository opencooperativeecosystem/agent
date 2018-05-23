import React from 'react'
import {Icons, Panel, NavigationItem} from 'oce-components/build'
import style from './style.css'
import { BrowserRouter as Router, Route, NavLink, Link } from "react-router-dom"

// ROUTES
import AgentPlans from '../agentPlans/wrapper'

const Work = (props) => {
  console.log(props.match)

  return (
    <Router>
      <div className={style.container}>
        <Panel icon={<Icons.Globe width='18' color='#f0f0f0' />} title='Network'>
          <div>
            {props.agentData.data.agentRelationships.map((item, i) => (
              <div className={style.container_link} key={i}>
                <NavLink activeClassName={style.active} to={`${props.match.path}/agent/` + item.object.id}>
                  <NavigationItem img={item.object.image} title={item.object.name} />
                </NavLink>
              </div>
            ))}
          </div>
        </Panel>
        <Route path={`${props.match.path}/agent/:id`} component={AgentPlans} />
      </div>
    </Router>
  )
}

export default Work
