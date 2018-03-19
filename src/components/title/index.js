import React from 'react'
import style from './index.css'

const Title = ({icon, title}) => (
  <h2 className={style.header_title}>
    {icon ? <span className={style.content_icon}>{icon}</span> : ''}
    {title}
  </h2>
)

export default Title