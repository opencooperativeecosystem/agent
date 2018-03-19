import React from 'react'
import style from './index.css'

const TextArea = ({action, type, title, placeholder}) => (
    <textarea placeholder={placeholder} onChange={action} className={style[type]} value={title} />  
)

export default TextArea
