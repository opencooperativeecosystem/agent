import React from 'react'
import style from './style.css'
import { Link } from 'react-router-dom'
import moment from 'moment'
import {withRouter} from 'react-router-dom'
const Cards = ({data, link, match, location}) => {
  let newData = data.map(x => ({...x, date: moment(x.plannedOn).unix()}))
  return (
    <div className={style.section_wrapper}>
      {newData
      .sort((a, b) => b.date - a.date)
      .map((org, i) => (
        <div key={i} className={style.lists_item}>
          <Link key={'plan_' + i} to={link + '/' + org.id} className={style.link}>
            <h4 className={style.item_title}>{org.name.length > 0 ? org.name : org.planProcesses[0].name}</h4>
            <h5 className={style.plan_scope}>{org.note}</h5>
            <div className={style.item_info}>
              <span className={style.info_date}>Due {moment(org.due).format('DD MMM YYYY')}</span>
              {/* <span className={org.planProcesses[0].isFinished ? style.info_status + ' ' + style.completed : org.planProcesses[0].isStarted ? style.info_status + ' ' + style.wip : style.info_status + ' ' + style.todo}>
                {org.planProcesses[0].isFinished ? 'Completed' : org.planProcesses[0].isStarted ? 'In Progress' : 'To do' }
              </span> */}
            </div>
          </Link>
      </div>
      ))}
    </div>
)
}

export default withRouter(Cards)
