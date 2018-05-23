import React from 'react'
import {Icons, Panel} from 'oce-components/build'
import Cards from '../components/cards'
import { BrowserRouter as Router, Route, NavLink, Link } from "react-router-dom"
import Plan from '../validation_plan/wrapper'
import style from './style.css'

const AgentPlans = (props) => {
  console.log(props)
  return (
    <Router>
      <div className={style.container}>
        <Panel icon={<Icons.Card width='18' height='18' color='#f0f0f0' />} title='Plans'>
          {props.data.agentPlans.length > 0
            ? <Cards
                data={props.data.agentPlans}
                link={`${props.match.url}/plan`}
              />
            : <div>No item in this section</div>
          }
        </Panel>
        <Route path={`${props.match.path}/plan/:id`} component={Plan} />
      </div>
    </Router>
  )
}

export default AgentPlans
