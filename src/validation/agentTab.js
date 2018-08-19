import React from 'react'
import style from './style.css'

export default props => {
    let totHours = props.data.events.reduce(function(a, b) {
        return a + b.hours;
      }, 0);
    return (
    <div className={style.tab_agent}>
    <div className={style.agent_info}>
      <div className={style.info_image} style={{backgroundImage: `url(${props.data.image})`}}/>
      <div className={style.info_name}>{props.data.name}</div>
    </div>
    <div className={style.tab_contributions} >
      {props.data.events.map((event, i) => {
         return (
          <div
            key={i} className={event.validations === 0 ? style.contributions_item : event.validations === 1 ? style.contributions_item + " " + style.incompleted : style.contributions_item + " " + style.completed }
          />
      )})}
    </div>
    <div className={style.agent_resume}>
      <h4>Tot. {totHours} Hours</h4>
    </div>
  </div>
)}