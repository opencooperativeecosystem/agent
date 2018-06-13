import React from 'react'
import style from './style.css'
const Alert = ({children}) => (
    <div className={style.alert}>{children}</div>
)

export default Alert