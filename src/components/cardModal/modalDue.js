import React from "react";
import { Icons } from "oce-components/build";
import moment from 'moment'
import style from './index.css'

const Due = ({due}) => {
  let duration = moment
    .duration(moment(due).diff(moment()))
    .asHours();
  let deadline = duration < 0 ? 'expired' : duration < 48 ? 'soon' : ''
  return (
  <div className={style.labels_actions}>
    <div className={style.due + ' ' + style[deadline]}>
       <span className={style.labels_icon}><Icons.Clock width='18' height='18' color={deadline === 'soon' ? '#fff' : deadline === 'expired' ? '#fff' : '#8D8D8D' } /></span>
      <span className={style.due_item}>
        {moment(due).format("DD MMM YYYY")}
      </span>
    </div>
  </div>
)};


export default Due