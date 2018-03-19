import React from 'react'
import style from './index.css'

const Popup = ({type, title, content}) => (
  <div className={style[type] + ' ' + style.popup}>
    <div className={style.popup_header}>
        <h5>{title}</h5>
    </div>
    <div className={style.popup_content}>
      {content}
    </div>
  </div>
)

export default Popup