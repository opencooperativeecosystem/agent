import React from 'react'
import style from './index.css'
import {Line} from 'rc-progress'
import moment from 'moment'

const Card = (props) => {
  const {id, listId, isFinished, openModal, percentage, note, members} = props
  const due = moment(props.due).format('DD MMM YYYY')
  return (
    <div onClick={() => openModal(id, listId)} className={isFinished ? style.card + ' ' + style.isFinished : style.card}>
      {isFinished ? ''
      : <Line percent={percentage > 100 ? 100 : percentage} strokeWidth="1" strokeColor="#4DC65E" />}
      <span className={style.card_title}>{note || 'Add new description...'}</span>
      <div className={style.card_infos}>
        <h4 className={style.infos_due}>
          Due to {due}
        </h4>
        <div className={style.infos_members}>
          {members.map((member, i) => (
            <span key={i} className={style.members_item}>
              <img className={style.item_photo} src={member.image} />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Card
