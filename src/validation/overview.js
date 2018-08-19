import React from 'react'
import style from './style.css'

export default props => (
    <div className={style.data_overview}>
    <div className={style.overview_box}>
      <h1>{props.data.viewer.agent.agentPlans.length}</h1>
      <h2>Total plans</h2>
    </div>
    <div className={style.overview_box}>
      <h1>{props.data.viewer.agent.eventsCount}</h1>
      <h2>Total events</h2>
    </div>
    <div className={style.overview_box}>
      <h1>{props.data.viewer.agent.eventHoursCount}</h1>
      <h2>Total hours</h2>
    </div>
    <div className={style.overview_box}>
      <h1>{props.data.viewer.agent.eventPeopleCount}</h1>
      <h2>Total Agents</h2>
    </div>
  </div>
)