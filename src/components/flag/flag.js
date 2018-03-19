import React from 'react'
import style from './style.css'
import {Shield} from '../../icons'

const Flag = ({data, deleteFlag}) => {
  return (
    <div className={data.title ? style.flag + ' ' + style.active : style.flag}>
      <div className={style.flag_internal}>
        <div className={style.internal_icon}><Shield width={18} heigth={18} color={'#DE350B'}/></div>
        <div className={style.internal_content}>
          <h1>{data.title || ''}</h1>
          <h5 className={style.flag_description}>{data.message || ''}</h5>
          <button onClick={() => deleteFlag()} className={style.flag_close}>Close</button>
        </div>
      </div>
    </div>
  )
}

export default Flag
