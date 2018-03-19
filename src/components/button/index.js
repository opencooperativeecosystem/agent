import React from 'react'
import style from './index.css'

const Button = ({action, type, title}) => (
    <button onClick={action} className={style[type]} >{title}</button>
)

export default Button