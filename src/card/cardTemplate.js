import React from 'react'
import style from './index.css'
import {Line} from 'rc-progress'
import moment from 'moment'

const CardTemplate = (props) => {
  return (
    <div onClick={props.action} className={props.isDragging ? style.card + ' ' + style.dragged : style.card}>
      <Line percent={props.percentage > 100 ? 100 : props.percentage} strokeWidth="1" strokeColor="#4DC65E" />
      <span className={style.card_title}>{props.note}</span>
      <div className={style.card_infos}>
        <h4 className={style.infos_due}>
          Due to {moment(props.due).format('DD MMM YYYY')}
        </h4>
        <div className={style.infos_members}>
          {props.members.map((member, i) => (
            <span key={i} className={style.members_item}>
              <img className={style.item_photo} src={member.image} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CardTemplate
