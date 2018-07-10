import React from "react";
import { Icons } from "oce-components/build";
import moment from 'moment'
import style from './index.css'

const Due = ({due}) => (
  <div className={style.labels_actions}>
    <div className={style.due}>
       <span className={style.labels_icon}><Icons.Clock width='18' height='18' color='#8D8D8D' /></span>
      <span className={style.due_item}>
        {moment(due).format("DD MMM YYYY")}
      </span>
    </div>
  </div>
);


export default Due